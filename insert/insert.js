//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/",(req,res)=>{
    let obj = req.body
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in Connection :- ',err)
        else{
            let db = conn.db('nodedb')
            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'error'+err})
                else{
                    console.log('Data Inserted')
                    res.json({'insert':'success'})
                    conn.close()
                }
            })
        }
    })
})


//export router
module.exports = router