const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ProfilingLevel, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://databaseMeeUser:EmXwoX2SucVPIvBh@clusterok.helsitf.mongodb.net/?appName=Clusterok";

//EmXwoX2SucVPIvBh
//databaseMeeUser
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res)=>{
    res.send('hi i am ruklu')
})

async function run() {
    try{
        await client.connect();
         const usersDB = client.db('usersDB');
         const usersCollection = usersDB.collection('users')

         app.get('/users', async (req, res)=>{
          const cursor = usersCollection.find();
          const result = await cursor.toArray();
          res.send(result);
         })

         app.get('/users/:id', async (req, res)=>{
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await usersCollection.findOne(query)
          res.send(result);
         })

        //add database related api here 
        app.post('/users', async (req, res)=>{
          const newUser = req.body;
          const result = await usersCollection.insertOne(newUser);
          res.send(result)
        })

        app.delete('/users/:id', async (req, res)=>{
          console.log(req.params.id);
          const id = req.params.id;
          const query =  {_id: new ObjectId(id)};
          const result = await usersCollection.deleteOne(query);
          res.send(result)
          
          console.log('delete a user from database');
          
        })
        await client.db('admin').command({ ping: 1})
        console.log('pinged your deployedment');
        
    }
    finally{

    }
    
}
run().catch(console.dir)


app.listen(port, ()=>{
    console.log(`happy to see you ${port}`)
})
