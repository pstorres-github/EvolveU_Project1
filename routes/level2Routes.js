const express = require ('express');
const router = express.Router()
const db = require('../model/db.js')
const ObjectId = require('mongodb').ObjectId; 

/* --- INTERNAL FUNCTIONS ----*/

async function getlevel2Collection() {
    return db.getCollection("level2")
}

async function findStep (stepNum) {
    let collection = await getlevel2Collection()
    let cursor = collection.findOne( {"stepNum" : stepNum})
  
    return cursor
}

/*  --- GET--- */

router.get('/level2/:stepNum', async (request, response) => {
    const { stepNum } = request.params;
    let querystring = stepNum.toString(10)     
    let founditem = await findStep(querystring)
    response.send(founditem)
})   
   
module.exports = router