const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;



//midware
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("brand Sever Runing")
})


app.listen(port, () =>{
    console.log(`the brand server is runging: ${port}`)
})