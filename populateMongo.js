// ARRAYS WITH INITIAL INFO

const {level1Database} = require('./model/level1Database.js')
const {level2Database} = require('./model/level2Database.js')
const {level3Database} = require('./model/level3Database.js')

const {playerDatabase} = require('./model/playerDatabase.js')

const db = require('./model/db.js')

async function populateMongoDB (collectionName, arrayName) {
    let collection = await db.getCollection(collectionName)
    let dataArray = await collection.insertMany(arrayName)
    console.log(`${collectionName} collection has been populated in MongoDB`)
}

async function clearMongoDB (collectionName) {
    let collection = await db.getCollection(collectionName)
    let dataArray = await collection.deleteMany()
    console.log(`${collectionName} collection contents have been deleted in MongoDB`)
}


// clear database
clearMongoDB ("level1")
clearMongoDB ("level2")
clearMongoDB ("level3")
clearMongoDB ("players")

// populate mongo database
populateMongoDB("level1", level1Database)
populateMongoDB("level2", level2Database)
populateMongoDB("level3", level3Database)
populateMongoDB("players", playerDatabase)



