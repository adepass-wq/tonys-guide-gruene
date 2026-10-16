const fs = require('node:fs');
const path = require('node:path');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
module.exports = function foodwaysCatalogue(root) {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'data/foodways-authentication.json'), 'utf8'));
  const sources = new Map(data.sources.map(source => [source.id, source]));
  const labels = {'published-preparation':'Published preparation','documented-variation':'Attributed variation','dish-only':'Dish or product documented','related-evidence':'Related evidence only','unresolved':'Authentication outstanding'};
  return data.entries.map(entry => {
    const source = sources.get(entry.sourceIds[0]);
    if (!source) throw Error('Missing Foodways source: ' + entry.id);
    const established = ['published-preparation', 'documented-variation'].includes(entry.status);
    const recipe = entry.publishedPreparation;
    const preparation = recipe && recipe.displayMode === 'preparation' ? `<details class="foodways-preparation"><summary>Documented preparation: ${escape(entry.name)}</summary><p><strong>Source: Grace Foods.</strong> Publisher yield: ${escape(recipe.yield)}. Not kitchen-tested by Tony’s Guide. Ingredient quantities follow the linked source; instructions are paraphrased.</p><h4>Ingredients</h4><ul>${recipe.ingredients.map(x=>'<li>'+escape(x)+'</li>').join('')}</ul><h4>Preparation</h4><ol>${recipe.steps.map(x=>'<li>'+escape(x)+'</li>').join('')}</ol><p><strong>Source limit:</strong> ${escape(recipe.limitation)}</p></details>` : '';
    const link = source.retrieval === 'page-read' ? `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${established ? 'Read the published preparation' : 'Examine the evidence'} ↗</a>` : '<p>The candidate source could not be fully retrieved; no preparation is endorsed.</p>';
    return `<article class="foodways-card foodways-entry" id="${escape(entry.id)}" data-foodways-category="${escape(entry.category)}" data-foodways-status="${escape(entry.status)}"><p class="foodways-status">${escape(labels[entry.status])}</p><h3>${escape(entry.name)}</h3><p class="foodways-meta">${escape(entry.category)}</p><p>${escape(entry.note)}</p>${preparation}${link}<details class="foodways-source-review"><summary>Source and review: ${escape(entry.name)}</summary><p><cite>${escape(source.title)}</cite>. ${escape(source.author)}.${source.publicationDate ? ' Publisher date: '+escape(source.publicationDate)+'.' : ' Publication date not established.'} Checked ${data.reviewedOn}.</p><p>The earlier Tony’s Guide formula remains unverified and withheld. No Tony’s Guide kitchen trial has been recorded. A source recipe does not establish the dish’s historical origin.</p>${entry.sourceClarificationRequired ? '<p><strong>Source clarification or safety review is still required before reproducing a formula.</strong></p>' : ''}${recipe && recipe.displayMode === 'source-record' ? `<p><strong>Withheld source transcription:</strong> ${escape(recipe.limitation)}</p>` : ''}${entry.relatedEntry ? `<p><a href="#${escape(entry.relatedEntry)}">Compare the overlapping dish record →</a></p>` : ''}</details></article>`;
  }).join('\n');
};
