#!/usr/bin/env bash
# On-box deploy for the x1voice.com marketing site (runs as ec2-user via SSM).
#
# Swaps a pre-built artifact into /opt/x1-marketing with rollback: extract to a
# staging dir, preserve host-local runtime files, atomic-ish dir swap, restart
# the PM2 process, health-check, and roll back to the previous release if the
# app doesn't come up. The previous release is kept until the next deploy.
#
# Usage: deploy-prod.sh /tmp/marketing-deploy.tar.gz
set -euo pipefail

TARBALL="${1:?usage: deploy-prod.sh <tarball>}"
LIVE=/opt/x1-marketing
NEW=/opt/x1-marketing-new
PREV=/opt/x1-marketing-prev
FAILED=/opt/x1-marketing-failed
HEALTH_URL=http://127.0.0.1:3002/

# One-time self-heal: the release dirs are siblings under /opt, which is
# root-owned by default, so ec2-user can't mkdir/mv/rm them. Grant ec2-user
# rwx on the /opt directory ONLY, via an ACL — root keeps ownership and every
# existing entry under /opt is left untouched. This is the least privilege the
# sibling-dir swap needs; deliberately NOT `chown /opt` (which would hand over
# all of /opt) or `chown -R`. Idempotent (skipped once /opt is writable); needs
# ec2-user sudo, the default on Amazon Linux. Without it the first deploy fails
# on `mkdir /opt/x1-marketing-new: Permission denied`.
if [ ! -w /opt ]; then
  if command -v setfacl >/dev/null 2>&1; then
    sudo setfacl -m u:ec2-user:rwx /opt
  else
    echo "ERROR: /opt not writable by ec2-user and setfacl is unavailable." >&2
    echo "Run once on the host: sudo setfacl -m u:ec2-user:rwx /opt" >&2
    exit 1
  fi
fi

rm -rf "$NEW"
mkdir -p "$NEW"
tar xzf "$TARBALL" -C "$NEW"

# Preserve host-local runtime files that don't ship in the artifact.
if [ ! -f "$NEW/.env.production" ] && [ -f "$LIVE/.env.production" ]; then
  cp "$LIVE/.env.production" "$NEW/"
fi
if [ -f "$LIVE/ecosystem.config.cjs" ]; then
  cp "$LIVE/ecosystem.config.cjs" "$NEW/"
fi

rm -rf "$PREV"
mv "$LIVE" "$PREV"
mv "$NEW" "$LIVE"

pm2 restart x1-marketing --update-env

healthy=""
for _ in $(seq 1 15); do
  sleep 2
  if curl -sf -o /dev/null "$HEALTH_URL"; then
    healthy=yes
    break
  fi
done

if [ -z "$healthy" ]; then
  echo "health check FAILED — rolling back to previous release" >&2
  rm -rf "$FAILED"
  mv "$LIVE" "$FAILED"
  mv "$PREV" "$LIVE"
  pm2 restart x1-marketing --update-env
  exit 1
fi

pm2 save
echo "deploy healthy"
