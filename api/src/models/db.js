//Here we put our instructions for our database connection
const { MongoClient } = require('mongodb');
let URIString = process.env.URI_STRING;
// console.log(URIString);

const withDB = async (operations, response) => {
  try {
    // console.log(URIString);
    const client = await MongoClient.connect(URIString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('CustomersDB');
    await operations(db);
    client.close();
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

module.exports = { withDB };
