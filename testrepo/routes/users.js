const express = require('express');
const router = express.Router();

// Add MongoDB client
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Define route for creating a new user
router.post('/', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("your_database_name").collection("your_collection_name");
    const result = await collection.insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sex: req.body.sex
    });
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  } finally {
    await client.close();
  }
});

module.exports = router;
