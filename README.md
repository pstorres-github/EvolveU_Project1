# EvolveU_Project1
"The Cursed Treasure of Volcano Island"
--------------------------------------------------------------------------------------------------------------
This is a choose your own adventure style pirate game, based on the "Choose your own adventure" books series.
--------------------------------------------------------------------------------------------------------------
To run, you need to populate a local Mongo DB database with the model files.  This can be done by either:
  a.) typing "node populateMongoDB.js" at the command line.  This will run a script to populate the database (root database should be called pirateDatabase).
  or
  b.) Import the .json files located within the /json folder using mongoImport at command line.  You may need to install the command line mongoDB tools from https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools.  
Type the following at commandline at the root directory:
mongoimport --db pirateGame --collection level1 --file json/level1.json --jsonArray
mongoimport --db pirateGame --collection level2 --file json/level2.json --jsonArray
mongoimport --db pirateGame --collection level3 --file json/level3.json --jsonArray
mongoimport --db pirateGame --collection players --file json/players.json --jsonArray
 
 
 Then to run, "npm install", open up http://localhost:3000/, "npm start"


