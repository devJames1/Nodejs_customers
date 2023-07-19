const { withDB } = require('./db');
const ObjectId = require('mongodb').ObjectId;

async function insertCustomer(req, res) {
  try {
    withDB(async (db) => {
    
      await db.collection('clients').insertOne(req.body);
      res.status(201).json({msg: 'One customer successfully inserted'});
    }, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function findAllCustomers(req, res) {
  try {
    withDB(async (db) => {
      const customers = await db.collection('clients').find({}).toArray();
      res.json({ customers });
    }, res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function findOneCustomer(req, res) {
  try {
    withDB(async (db) => {
      const customer = await db
        .collection('clients')
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!customer) {
        res.status(400).json({ error: 'user not found' });
      }
      res.json({ customer });
    }, res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateCustomer(req, res) {
  try {
    withDB(async (db) => {
      let updatedClient = await db.collection('clients').findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        {
          $set: req.body,
        },
        {
          returnDocument: 'after',
        }
      );
      res.json({ customer: updatedClient.value });
    });
  } catch (err) {
    res.status(500).json({ Error: 'Something went wrong' });
  }
}

async function deleteOne(req, res) {
  withDB(async (db) => {
    await db
      .collection('clients')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ msg: 'One document deleted' });
  }, res);
}

module.exports = {
  insertCustomer,
  findAllCustomers,
  findOneCustomer,
  updateCustomer,
  deleteOne,
};
