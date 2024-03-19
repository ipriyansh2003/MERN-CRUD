const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect("mongodb://127.0.0.1:27017/mernproject",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection succesful")
}).catch((err)=>{
    console.log(err)
})
