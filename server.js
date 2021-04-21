const express = require ('express')  // imports express module into server.js file
const app = express()  // create app object, to run express.  express app object
const level1Routes = require ('./routes/level1Routes')
const level2Routes = require ('./routes/level2Routes')
const playersRoutes = require ('./routes/playersRoutes')

const router = express.Router()

// Add Access Control Allow Origin headers
/*app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})*/

app.use(express.json())

app.use('/', level1Routes)

app.use('/', level2Routes)

app.use('/', playersRoutes)

app.use('/', express.static('public'))


let port = process.env.PORT || 3000
app.listen (port, () => console.log (`Server listening at ${port}`))

