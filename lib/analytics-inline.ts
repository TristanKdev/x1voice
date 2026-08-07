import { SITE_EVENTS } from "@/lib/analytics-events-list"

/**
 * The dataLayer bootstrap and the delegated click listener, as a string, so
 * they can ship as `beforeInteractive` scripts in the server-rendered <head>.
 *
 * Why not a React component: a `useEffect` listener only exists after
 * hydration. On a slow phone that is a real window, and the click most likely
 * to happen in it is the one that matters most — the tap on the demo number in
 * the header. Attaching in the document head means the listener is live before
 * the first paint's JavaScript has finished, and the dataLayer queue exists
 * before GTM itself loads.
 */
export const GTM_BOOTSTRAP = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','__GTM_ID__');`

export function gtmBootstrap(gtmId: string): string {
  return GTM_BOOTSTRAP.replace("__GTM_ID__", gtmId)
}

/**
 * Delegated click tracking. Kept deliberately small and dependency-free.
 *
 * - `tel:` → demo_call_click, the primary conversion
 * - `mailto:` and off-site links → outbound_click
 * - `data-track="<event>"` → that event, with `data-track-*` as parameters
 *
 * Unknown event names are dropped with a console warning rather than pushed:
 * a typo that silently reaches the dataLayer is a conversion that looks
 * configured and never fires.
 */
export const CLICK_TRACKER = `(function(){
var EVENTS=${JSON.stringify(SITE_EVENTS)};
function push(e,p){
  if(EVENTS.indexOf(e)===-1){if(window.console)console.warn('[analytics] unknown event: '+e);return}
  p=p||{};p.event=e;window.dataLayer=window.dataLayer||[];window.dataLayer.push(p)
}
function placement(el){
  var s=el.closest('[data-section]');
  if(s&&s.getAttribute('data-section'))return s.getAttribute('data-section');
  var sec=el.closest('section');
  if(sec&&sec.id)return sec.id;
  if(el.closest('header'))return 'header';
  if(el.closest('footer'))return 'footer';
  if(el.closest('form'))return 'form';
  return 'body'
}
var last=0,lastKey='';
function handle(ev){
  var el=ev.target&&ev.target.closest?ev.target.closest('a,button'):null;
  if(!el)return;
  var now=Date.now();
  var key=(el.getAttribute('href')||'')+'|'+(el.dataset.track||'');
  if(key===lastKey&&now-last<500)return;
  last=now;lastKey=key;
  var explicit=el.dataset.track;
  if(explicit){
    var params={};
    for(var k in el.dataset){
      if(k==='track'||k.indexOf('track')!==0)continue;
      var name=k.slice(5);
      name=name.charAt(0).toLowerCase()+name.slice(1);
      name=name.replace(/[A-Z]/g,function(c){return '_'+c.toLowerCase()});
      params[name]=el.dataset[k]
    }
    params.placement=placement(el);
    params.page_path=window.location.pathname;
    push(explicit,params);
    return
  }
  var href=el.getAttribute('href');
  if(!href)return;
  var base={placement:placement(el),page_path:window.location.pathname};
  if(href.indexOf('tel:')===0){base.phone_number=href.slice(4);push('demo_call_click',base);return}
  if(href.indexOf('mailto:')===0){base.link_url=href;push('outbound_click',base);return}
  if(/^https?:\\/\\//.test(href)&&href.indexOf(window.location.origin)!==0){
    base.link_url=href;
    try{base.link_domain=new URL(href).hostname}catch(e){}
    push('outbound_click',base)
  }
}
document.addEventListener('click',handle,true);
// Middle-click opens a link in a new tab and never fires 'click'.
document.addEventListener('auxclick',function(ev){if(ev.button===1)handle(ev)},true);
})();`
