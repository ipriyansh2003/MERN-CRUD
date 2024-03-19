const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config
const Customer = require('../models/customer')
const auth = require('../middleware/auth')

router.post('/',auth,async (req,res)=>{
    try {
        
        const {name} = req.body
        const newCustomer = new Customer({
            name:name
        })

        const saveCustomer = await newCustomer.save()

        res.json("new customer is created")
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

//get all customer
router.get('/',auth,async(req,res)=>{
      try {
        const customers = await Customer.find()
        res.json(customers)
      } catch (error) {
        console.log(error)
        res.status(500).send()
      }
})
// update the customer 

router.get('/getuser/:id',auth,async(req,res)=>{
    try{
        const id = req.params.id
        const customer =  await Customer.findById({_id:id})
        res.json(customer)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

router.patch('/update/:id',auth,async (req,res)=>{
    try {
        const id = req.params.id
        const customer =  await Customer.findById({_id:id})

        if(!customer){
            return res.status(400).json("no user by this id")
        }
        
       const updatedname = req.body.name
        const updated = await Customer.updateOne({_id:id},{$set:{name:updatedname}})
        res.json({"success":"customer is updated succesfully",updated:updated})

    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})
// Delete the customer
router.delete('/delete/:id',auth,async (req,res)=>{
    try {
        const id = req.params.id

        const customer =  await Customer.findById({_id:id})
        if(!customer){
            return res.status(400).json("no user by this id")
        }
        
        const deleted = await Customer.findByIdAndDelete({_id:id})
        res.json({"success":"customer is deleted succesfully",delete:deleted})

    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})
module.exports = router