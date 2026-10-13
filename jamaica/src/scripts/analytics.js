// Tony's Guide GA4: production domains only; no notes, emails or query strings.
(function () {
  const edition = 'jamaica';
  if (location.hostname !== 'jamaica.tonysguide.com' || window.tgEditionAnalyticsReady) return;
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  window.tgEditionAnalyticsReady = true;
  const measurementId = 'G-XPK1GLWGMK';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false, guide_edition:edition});
  let previous;
  function pageView() {
    const raw = location.hash.slice(1);
    const id = /^[a-z0-9-]+$/i.test(raw) && document.getElementById(raw) ? raw : 'home';
    const route = location.pathname + '#' + id;
    if (route === previous) return;
    previous = route;
    window.gtag('event', 'page_view', {send_to:measurementId, page_location:location.origin + route, page_title:document.title, guide_edition:edition});
  }
  pageView();
  window.addEventListener('hashchange', function () { requestAnimationFrame(pageView); });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
})();
