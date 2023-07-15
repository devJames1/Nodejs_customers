const { withDB } = require('./db');
const ObjectId = require('mongodb').ObjectId;

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
      // data = {
      //   name: req.body.name,
      //   industry: req.body.industry,
      // };
      await db.collection('clients').insertOne(req.body);
      res.status(201).send('One customer successfully inserted');
    }, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

async function findOneCustomer(req, res) {
  try {
    withDB(async (db) => {
      const clientsDocList = await db
        .collection('clients')
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!clientsDocList) {
        res.status(400).json({ error: 'user not found' });
      }
      res.json({ clients: clientsDocList });
    }, res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateCustomer(req, res) {
  try {
    withDB(async (db) => {
      let updatedRec = await db.collection('clients').findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        {
          $set: {
            name: req.body.name,
            industry: req.body.industry,
          },
        },
        {
          returnDocument: 'after',
        }
      );
      res.json({ updatedRecord: updatedRec.value });
    });
  } catch (err) {
    res.status(500).json({ Error: 'Something went wrong' });
  }
}

module.exports = {
  insertCustomer,
  findAllCustomers,
  findOneCustomer,
  updateCustomer,
};
