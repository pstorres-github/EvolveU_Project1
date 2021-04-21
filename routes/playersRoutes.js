const express = require ('express');
const router = express.Router()
const db = require('../model/db.js')
const ObjectId = require('mongodb').ObjectId; 

/* --- INTERNAL FUNCTIONS ----*/

async function getPlayersCollection() {
    return db.getCollection("players")
}

async function findPlayer (name) {

    let collection = await getPlayersCollection()
    let cursor = collection.findOne( {"name" : name})
    
    return cursor
}

/*  ----- GET ------ */

router.get('/player/toplist', async (request, response) => {
    let collection = await getPlayersCollection()
    let cursor = collection.find({}).sort({highScore:-1})
    let playerList = await cursor.toArray()
    response.send(playerList)
    return playerList  
})

router.get('/player/list', async (request, response) => {
    let collection = await getPlayersCollection()
    let cursor = collection.find({})
    let playerList = await cursor.toArray()
    response.send(playerList)
    return playerList  
})

router.get('/player/findByName/:name', async (request, response) => {
    const { name } = request.params;
    let querystring = name
    let founditem = await findPlayer(querystring)
    
   response.send(founditem)
    console.log("FOUND ITEM", founditem)
    return founditem
})

/*  ----- PUT ------ */

router.put('/player/updateScore/:id/:score', async (request, response) => {
    let { id } = request.params
    let { score } = request.params
    
    /*typecast score as number*/
    let scoreAsNumber = Number(score,10)

    let collection = await getPlayersCollection()
    
    let findPlayer = await collection.findAndModify({"_id": ObjectId(id)}, [['_id','asc']],{$set:{"highScore":scoreAsNumber}},{}, function (err,object) {
        if (err) {
            console.warn(err.message);
        } else {
            console.dir (object)
        }
    })
    response.send ("High Score update")
    return findPlayer
})

router.put('/player/updateProgress/:id/:score/:level/:step', async (request, response) => {
    let { id } = request.params
    let { score } = request.params
    let { level } = request.params
    let { step } = request.params
    
    /*typecast score as number*/
    let scoreAsNumber = Number(score,10)

    let collection = await getPlayersCollection()
    
    let findPlayer = await collection.findAndModify({"_id": ObjectId(id)}, [['_id','asc']],{$set:{"score":scoreAsNumber, "level":level, "step":step}},{}, function (err,object) {
        if (err) {
            console.warn(err.message);
        } else {
            console.dir (object)
        }
    })
    response.send ("Data stored in user profile")
    return findPlayer
})

/*  ----- POST ------ */

router.post('/player/create/:name', async (request, response) => {
    let { name } = request.params
    let collection = await getPlayersCollection()
    let insertedplayer = await collection.insertOne ({"name":name, "level":1, "step":1, "score":0, "highScore":0})
    response.send (`${name} was added to list`)
    return insertedplayer.ops[0].id
})


module.exports = router