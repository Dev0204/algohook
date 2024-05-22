const express = require('express');
const bodyParser = require('body-parser');
const algoliasearch = require('algoliasearch');

const app = express();
app.use(bodyParser.json());

const algoliaClient = algoliasearch('2DPKAUZZE3', '0d58c51915b5b3cabff9445d6bc3b9c0');
const index = algoliaClient.initIndex('BioMarkers');

app.post('/webhook', async (req, res) => {
  const { type, table, record } = req.body;

  if (table !== 'products') {
    return res.status(400).send('Invalid table');
  }

  try {
    if (type === 'INSERT' || type === 'UPDATE') {
      await index.saveObject({
        objectID: record.product_id,
        product_id: record.product_id,
        quantity: record.quantity,
        selling_price: record.selling_price,
      });
    } else if (type === 'DELETE') {
      await index.deleteObject(record.product_id);
    }
    res.status(200).send('Algolia index updated');
  } catch (error) {
    console.error('Error updating Algolia', error);
    res.status(500).send('Error updating Algolia');
  }
});

module.exports = app;
