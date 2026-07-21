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
# root-owned by default, so ec2-user can't mkdir/mv/rm them. Grant ownership
# once. Idempotent (skipped when already writable); needs ec2-user sudo, which
# is the default on Amazon Linux. Without this the very first deploy fails on
# `mkdir /opt/x1-marketing-new: Permission denied`.
if [ ! -w /opt ]; then
  sudo chown ec2-user:ec2-user /opt
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
