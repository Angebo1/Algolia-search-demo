const searchClient = algoliasearch(
    'Q485HB0M88',
    '81435fd7b02b81b4ed1c62ae5af3c64e'
  );
  
  const search = instantsearch({
    indexName: 'products',
    searchClient,
  });
  
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
      placeholder: 'Search products...',
    }),
  
    instantsearch.widgets.stats({
      container: '#stats',
    }),
  
    instantsearch.widgets.currentRefinements({
      container: '#current-refinements',
    }),
  
    instantsearch.widgets.clearRefinements({
      container: '#clear-refinements',
    }),
  
    instantsearch.widgets.hierarchicalMenu({
      container: '#categories',
      attributes: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2',
        'hierarchicalCategories.lvl3'
      ],
    }),
  
    instantsearch.widgets.refinementList({
      container: '#brand',
      attribute: 'brand',
      searchable: true,
    }),
  
    instantsearch.widgets.rangeInput({
      container: '#price',
      attribute: 'price',
    }),
  
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item(hit) {
          return `
            <article class="card">
              <img class="card-image" src="${hit.image}" alt="${hit.name}" />
              <div class="card-body">
                <h2 class="card-title">${instantsearch.highlight({ attribute: 'name', hit })}</h2>
                <p class="card-brand">${hit.brand || ''}</p>
                <p class="card-price">$${hit.price}</p>
              </div>
            </article>
          `;
        },
        empty(results) {
          return `<p>No results found for "<strong>${results.query}</strong>"</p>`;
        }
      },
    }),
  
    instantsearch.widgets.pagination({
      container: '#pagination',
    }),
  ]);
  
  search.start();