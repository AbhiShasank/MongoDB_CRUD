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
router.put("/",(req,res)=>{
    let p_id=req.body.p_id
    let obj = {
        p_name:req.body.p_name,
        p_cost:req.body.p_cost
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in Connection :- ',err)
        else{
            let db=conn.db('nodedb')
            db.collection('products').updateOne({p_id},{$set:obj},(err,result)=>{
                if(err)
                    res.json({'update':'Error '+err})
                else{
                    if(result.matchedCount!=0)
                        {
                            console.log('Data Updated')
                            res.json({'Update':'Success'})
                        }
                        else{
                            console.log('Data Not Updated')
                            res.json({'Update':'Record Not Found'})
                        }
                        conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
