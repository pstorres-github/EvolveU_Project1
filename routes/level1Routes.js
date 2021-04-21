const express = require ('express');
const router = express.Router()
const db = require('../model/db.js')
const ObjectId = require('mongodb').ObjectId; 

/* --- INTERNAL FUNCTIONS ----*/

async function getlevel1Collection() {
    return db.getCollection("level1")
}

async function findStep (stepNum) {
    let collection = await getlevel1Collection()
    let cursor = collection.findOne( {"stepNum" : stepNum})
  
    return cursor
}

/*  --- GET--- */

router.get('/level1/:stepNum', async (request, response) => {
    const { stepNum } = request.params;
    let querystring = stepNum.toString(10)     
    let founditem = await findStep(querystring)
    console.log(querystring, "Line 20, level1 Routes")
    console.log(founditem, "Line 22, level1 Routes")
    response.send(founditem)
})   
   
module.exports = router