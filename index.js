const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//brandshop
//jJSVYoyYnUqBeUNq

//midware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cmmcrj9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const carCollection = client.db('carsDB').collection('car');
        const branCollection = client.db('brandDB').collection('brands');

        app.post('/brand', async (req, res) => {
            const newbrand = req.body;
            console.log(newbrand);
            const result = await branCollection.insertOne(newbrand);
            res.send(result);
        })
        app.get('/brand',async(req,res)=>{
            const cursor = branCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/cars',async(req,res)=>{
            const cursor = carCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/cars/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id) }
            const result = await carCollection.findOne(query);
            res.send(result)
        })
        app.put('/cars/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id) }
            const option = {upsert: true};
            const updatedCars = req.body
            const cars = {
                $set: {
                    name: updatedCars.name,
                    brandname: updatedCars.brandname,
                    category: updatedCars.category,
                    price: updatedCars.price,
                    photo: updatedCars.photo
                }
            }
            const result = await carCollection.updateOne(query,cars,option)
            res.send(result)
            
        })
        

        app.post('/cars', async (req, res) => {
            const newCars = req.body;
            console.log(newCars);
            const result = await carCollection.insertOne(newCars);
            res.send(result);
        })
        


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("brand Sever Runing")
})


app.listen(port, () => {
    console.log(`the brand server is runging: ${port}`)
})