require('dotenv').config();
const algoliasearch = require('algoliasearch');
const products = require('./data/products.json');

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

const index = client.initIndex('products');

async function run() {
  await index.saveObjects(products, {
    autoGenerateObjectIDIfNotExist: true,
  });

  console.log(" Data indexed!");
}

run().catch(console.error);