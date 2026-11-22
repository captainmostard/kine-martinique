// Fiche praticien : carte OpenStreetMap du cabinet, bouton Partager et menu en îlot
(function(){
  const el = document.getElementById('fmap');
  if (el && window.L) {
    const pos = [+el.dataset.lat, +el.dataset.lon];
    const map = L.map(el, { scrollWheelZoom: false }).setView(pos, el.dataset.precision === 'commune' ? 13 : 16);
    L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', { maxZoom: 19, maxNativeZoom: 18, attribution: '&copy; IGN – Plan IGN' }).addTo(map);
    L.marker(pos, { icon: L.divIcon({ className: 'pin-wrap', html: '<span class="pin"></span>', iconSize: [26, 26], iconAnchor: [4, 30] }) }).addTo(map);
  }

  const partager = document.getElementById('partager'), toast = document.getElementById('toast');
  if (partager) partager.addEventListener('click', async () => {
    try {
      if (navigator.share) { await navigator.share({ title: document.title, url: location.href }); return; }
      await navigator.clipboard.writeText(location.href);
      toast.textContent = 'Lien de la fiche copié';
    } catch (e) {
      if (e.name === 'AbortError') return;
      toast.textContent = 'Copiez l’adresse de la page pour la partager';
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  });

  const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
  if (!burger || !menu) return;
  const set = open => {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.classList.toggle('open', open);
    menu.inert = !open;
    document.body.classList.toggle('menu-open', open);
  };
  burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();
