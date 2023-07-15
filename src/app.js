const express = require('express');
const app = express();
require('dotenv').config();
const {
  // returnAnyCustomer,
  insertCustomer,
  findAllCustomers,
  findOneCustomer,
  updateCustomer,
} = require('./models/customers.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const { MongoClient } = require('mongodb');

// if (process.env.NODE_ENV !== 'production') {
// }
let PORT = process.env.PORT || 3000;
const URI = process.env.URI;

// const customers = [
//   {
//     name: 'Caleb',
//     industry: 'music',
//   },
//   {
//     name: 'John',
//     industry: 'networking',
//   },
//   {
//     name: 'Sal',
//     industry: 'sports medicine',
//   },
// ];

app.get('/', (req, res) => {
  res.send('welcome!');
});

app.get('/api/customers', async (req, res) => {
  findAllCustomers(req, res);
});

app.get('/api/customers/:id', (req, res) => {
  findOneCustomer(req, res);
});

app.put('/api/customers/:id', (req, res) => {
  updateCustomer(req, res);
});

app.post('/api/customers', (req, res) => {
  insertCustomer(req, res);
});

app.post('/', (req, res) => {
  res.send('This is a post request');
});

app.listen(PORT, () => {
  console.log('App listening on port ' + PORT);
});
