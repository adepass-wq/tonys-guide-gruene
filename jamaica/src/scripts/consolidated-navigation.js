(()=>{
'use strict';
const E=id=>document.getElementById(id),voices=E('voices'),sources=E('sources'),atlas=E('island-voice-atlas');
// Retain old anchors and initialized controls, with one visible language destination.
const wrapper=atlas.closest('details'),legacy=document.createElement('div');legacy.className='language-compatibility';legacy.hidden=true;legacy.setAttribute('aria-hidden','true');voices.append(legacy);legacy.append(atlas);
for(const n of [atlas,...atlas.querySelectorAll('[id]')])n.dataset.routeAlias='interactive-island';
const resource=document.createElement('section');resource.className='wrap language-archive-links';resource.innerHTML='<h2>Language and oral-history archives</h2><p><a class="btn" href="#voices">Explore language &amp; voices →</a> <a href="https://acij-ioj.org.jm/av-collections/" target="_blank" rel="noopener">Jamaica Memory Bank: archive access ↗</a></p>';
wrapper.replaceWith(resource);
// Links into optional collections continue to open all their ancestors.
window.dispatchEvent(new HashChangeEvent('hashchange'));
})();
