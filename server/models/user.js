const mongoose = require('mongoose')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true,'email required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password needed']
    },
})


const User = new mongoose.model('User',userSchema)
module.exports = User