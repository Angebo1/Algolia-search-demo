require('dotenv').config();
const algoliasearch = require('algoliasearch');

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

const index = client.initIndex('products');

async function run() {
  await index.setSettings({
    searchableAttributes: [
      'unordered(name)',
      'unordered(brand)',
      'unordered(categories)',
      'unordered(description)'
    ],
    attributesForFaceting: [
      'searchable(brand)',
      'searchable(categories)',
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
      'hierarchicalCategories.lvl3',
      'price'
    ],
    customRanking: [
      'desc(popularity)',
      'desc(rating)',
      'asc(price)'
    ],
    attributesToSnippet: ['description:10'],
    attributesToHighlight: ['name', 'brand']
  });

  console.log(' Index settings applied!');
}

run().catch(console.error);