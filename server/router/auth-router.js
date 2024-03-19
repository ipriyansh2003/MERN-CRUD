const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config

//register
router.post('/register',async(req,res)=>{
    try {
        const {email,password,passwordverify} = req.body
      
        if(!email || !password ||!passwordverify){
            return res.status(400).json({message:"please enter all require field"})
        }
        if(password.length < 4){
         return res.status(400).json({message:"please password of length atleat 6 character"})           
        }
        if(password!==passwordverify){
            return res.status(400).json({message:"please enter same password twice"})
        }
      
        const existingUser = await User.findOne({email:email})

        if(existingUser){
            return res.status(400).json({message:"An account with this email already exist"})
        }
        
        //hash the password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password,salt)

        //save new user to database
        const newUser = new User({
            email:email,
            password:passwordHash
        })
        const saveUser = await newUser.save()
        
        //set cookies
        const token = jwt.sign({
            user:saveUser._id,
        },process.env.SECRET_KEY)

        res.cookie('jwt',token)

        res.json({msg:"successfully registered",
        "token" : await token
    })

    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
    
})

router.post('/login',async(req,res)=>{
    try {

        const {email,password} = req.body
      
        if(!email || !password){
            return res.status(400).json({message:"please enter all require field"})
        }

        const existingUser = await User.findOne({email:email})

        if(!existingUser){
            return res.status(401).json({message:"wrong email or password"})
        }
        
        const correctPassword = await bcrypt.compare(password,existingUser.password)

        if(!correctPassword){
            return res.status(401).json({message:"wrong email or password"})
        }

         //set cookies
         const token = jwt.sign({
            user:existingUser._id,
        },process.env.SECRET_KEY)

        res.cookie('jwt',token)

        res.json({msg:"successfully registered",
        "token" : await token
    })

    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})
router.get('/loggedIn',async(req,res)=>{
    try {
        const token = req.cookies.jwt;
        if (!token) return res.json(false);
    
       jwt.verify(token, process.env.SECRET_KEY);
       res.send(true)

      } catch (err) {
        console.error(err);
        res.json(false);
      }
})
router.get("/logout",(req,res)=>{
    return res.clearCookie('jwt').json('successfully logout')
})
module.exports = router