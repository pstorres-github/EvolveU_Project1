const express = require ('express');
const router = express.Router()
const db = require('../model/db.js')
const ObjectId = require('mongodb').ObjectId; 

/* --- INTERNAL FUNCTIONS ----*/

async function getlevel3Collection() {
    return db.getCollection("level3")
}

async function findStep (stepNum) {
    let collection = await getlevel3Collection()
    let cursor = collection.findOne( {"stepNum" : stepNum})
  
    return cursor
}

/*  --- GET--- */

router.get('/level3/:stepNum', async (request, response) => {
    const { stepNum } = request.params;
    let querystring = stepNum.toString(10)     
    let founditem = await findStep(querystring)
    response.send(founditem)
})   
   
module.exports = router