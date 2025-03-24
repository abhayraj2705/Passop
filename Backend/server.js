const express=require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const cors = require('cors')
dotenv.config()
const bodypaser=require('body-parser');
const { Result } = require('postcss');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/';   
const client = new MongoClient(url);
client.connect();

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())


// get all the passwords
app.get('/', async(req, res) => {
  
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
    
})

// save password 
app.post('/', async (req, res) => {
    const password = req.body;

    // Ensure that the request body is an object, not an array
    if (!password || typeof password !== 'object' || Array.isArray(password)) {
        return res.status(400).json({ error: "Invalid input. Expected an object, but received an array." });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        const insertResult = await collection.insertOne(password);
        res.json({ success: true, insertedId: insertResult.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to insert data" });
    }
});


// delete a password 
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})

// upadting the password 
app.get('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.updateOne(password);
    res.send({success: true, result: findResult})
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})