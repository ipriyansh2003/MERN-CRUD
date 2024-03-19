require('./db/database')
require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000
const router = require('./router/auth-router')
const customerrouter = require('./router/cutomer-router')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const corsOption = {
    origin:"http://localhost:3000",
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}
app.use(cors(corsOption))


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/auth',router)
app.use('/customer',customerrouter)


app.listen(port,()=>{
    console.log("server running at port 5000")
})