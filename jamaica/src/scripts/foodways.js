(function () {
  const page = document.getElementById('foodways');
  if (!page) return;
  const query = document.getElementById('foodways-query');
  const category = document.getElementById('foodways-category');
  const evidence = document.getElementById('foodways-evidence-filter');
  const count = document.getElementById('foodways-count');
  const empty = document.getElementById('foodways-empty');
  const cards = Array.from(page.querySelectorAll('.foodways-entry'));
  if (!query || !category || !evidence || !count || !empty) return;
  function draw() {
    const term = query.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      const status = card.dataset.foodwaysStatus;
      const sourced = status === 'published-preparation' || status === 'documented-variation';
      const matches = (!category.value || category.value === card.dataset.foodwaysCategory) &&
        (!evidence.value || (evidence.value === 'sourced' ? sourced : evidence.value === status)) &&
        (!term || card.textContent.toLocaleLowerCase().includes(term));
      card.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = visible + ' of ' + cards.length + ' dish records shown. Records include aliases and meal combinations.';
    empty.hidden = visible !== 0;
  }
  function revealLinkedRecord() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const linkedCard = cards.find(card => card.id === id);
    if (!linkedCard) return;
    const wasHidden = linkedCard.hidden;
    query.value = ''; category.value = ''; evidence.value = ''; draw();
    if (wasHidden) linkedCard.scrollIntoView({block: 'start'});
  }
  query.addEventListener('input', draw);
  category.addEventListener('change', draw);
  evidence.addEventListener('change', draw);
  document.getElementById('foodways-reset').addEventListener('click', function () {
    query.value = ''; category.value = ''; evidence.value = ''; draw(); query.focus();
  });
  window.addEventListener('hashchange', revealLinkedRecord);
  revealLinkedRecord(); draw();
})();
