# EvolveU_Project1

This is a choose your own adventure style Pirate game, based on the old "Choose your own adventure" books series.

To run, you need to populate a local Mongo DB database with the model files.  This can be done by either:
  a.) typing "node populateMongoDB.js" at the command line.  This will run a script to populate the database (root database should be called pirateDatabase).
  or
  b.) manually import the .json files located within the model/json folder using mongoImport. 
 
 Then to run, "npm install", open up http://localhost:3000/, "npm start"


