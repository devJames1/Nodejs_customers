const { withDB } = require('./db');

// async function returnAnyCustomer(req, res) {
//   const customer = {
//     name: 'caleb',
//     industry: 'marketing',
//   };
//   res.send(customer);
// }

async function insertCustomer(req, res) {
  try {
    withDB(async (db) => {
      data = {
        name: req.body.name,
        industry: req.body.industry,
      };
      await db.collection('clients').insertOne(data);
      res.send('one customer successfully inserted');
    }, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function findAllCustomers(req, res) {
  try {
    withDB(async (db) => {
      const clientsDocList = await db.collection('clients').find({}).toArray();
      res.json({ clients: clientsDocList });
    }, res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { insertCustomer, findAllCustomers };
