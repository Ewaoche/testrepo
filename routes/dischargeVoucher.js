const express = require('express');
const router = express.Router();

// Add MongoDB client
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Define route for creating a new discharge voucher
router.post('/', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("db").collection("collection");
    const result = await collection.insertOne({
      policyNumber: req.body.policyNumber,
      claimNumber: req.body.claimNumber,
      voucherType: req.body.voucherType,
      paymentDate: req.body.paymentDate,
      claimantName: req.body.claimantName,
      reserveList: req.body.reserveList,
      signedDate: req.body.signedDate,
      receivedDate: req.body.receivedDate
    });
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating discharge voucher');
  } finally {
    await client.close();
  }
});

module.exports = router;
