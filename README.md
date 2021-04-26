#  EvolveU_Project1: "The Cursed Treasure of Volcano Island"
This is a choose your own adventure style pirate game, designed to replicate the experience of reading the "Choose your own adventure book" series novels (https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure) in a more graphical way.

## General info
This proect was developed to demonstrate the use of APIs, the interactions between the front-end client and server, and the retrieval of information from a remote database (instead of data stored locally within user program).

## Technologies
This project is created to explore and use the following technologies and concepts:<br />
REST APIs, POSTMAN <br />
Importing NPM Modules <br />
node.js <br />
express.js <br />
MongoDB <br />
HTML, CSS <br />
Credit:  Pictures for this project are sourced from unsplash.com <br />

## Setup
To run, you need to populate a local Mongo DB database with the model files.  This can be done by either: <br />
  a.) typing "node populateMongoDB.js" at the command line.  This will run a script to populate the database (root database should be called pirateGame).  This only needs to be done at the beginning to install the intial version of the database. <br />
  or <br />
  b.) Import the .json files located within the /json folder using mongoImport at command line.  You may need to install the command line mongoDB tools from https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools.<br />
<br />  
Type the following at commandline at the root directory:<br />
```
mongoimport --db pirateGame --collection level1 --file json/level1.json --jsonArray
mongoimport --db pirateGame --collection level2 --file json/level2.json --jsonArray
mongoimport --db pirateGame --collection level3 --file json/level3.json --jsonArray
mongoimport --db pirateGame --collection players --file json/players.json --jsonArray
```
To run the project, install it locally using npm: 
```
$ npm install
$ npm start
```
Open up brower to http://localhost:3000/ to view the user interface and play the game!  Enjoy!


