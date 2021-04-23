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
    // if item is not found, returns NULL.  Send a response of null in a JSON friendly way.
    if (!founditem) 
        response.send ({name: null})
    else 
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
    
    let player = await collection.findOneAndUpdate({"_id": ObjectId(id)}, {$set:{"highScore":scoreAsNumber}})
    
    console.log('player high score updated')
    response.send (player)
    return player
})

router.put('/player/updateProgress/:id/:score/:level/:step', async (request, response) => {
    let { id } = request.params
    let { score } = request.params
    let { level } = request.params
    let { step } = request.params
    
    /*typecast score as number*/
    let scoreAsNumber = Number(score,10)

    let collection = await getPlayersCollection()
    /*
    let updatedPlayer= await collection.findOneAndUpdate({"_id": ObjectId(id)}, [['_id','asc']],{$set:{"score":scoreAsNumber, "level":level, "step":step}},{}, function (err,object) {
                                                        if (err) {console.warn(err.message)} else {console.dir (object)} }) 
    */
    let updatedPlayer= await collection.findOneAndUpdate({"_id": ObjectId(id)}, {$set:{"score":scoreAsNumber, "level":level, "step":step}}) 
    
    console.log('player progress updated', updatedPlayer)
    response.send (updatedPlayer)
    return updatedPlayer
})

/*  ----- POST ------ */

router.post('/player/create/:name', async (request, response) => {
    let { name } = request.params
    let collection = await getPlayersCollection()
    let insertedPlayer = await collection.insertOne ({"name":name, "level":1, "step":1, "score":0, "highScore":0})
    console.log (`${name} was added to list`)
    response.send (insertedPlayer)
    return insertedPlayer.ops[0].id
})


module.exports = router