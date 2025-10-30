const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) =>{
    res.send('my first backend file..')
})

app.listen(port, ()=>{
    console.log(`my server is running on port : ${port}`)
});

