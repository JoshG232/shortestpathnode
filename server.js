
//We need to add everything to are node.js server so we use require to show that we need it
const express = require("express")
const Datastore = require("nedb")  
const app = express()

//Setting up the servers port and how it should take in data. so express.json for json format
PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("listening at 3000"))  
app.use(express.static("public"))                         
app.use(express.json())

//Creating the databases and loading them
const routesdb = new Datastore("routesdb.db")  
const graphsdb = new Datastore("graphdb.db")  
routesdb.loadDatabase()
graphsdb.loadDatabase()

// POST request which gets data from the client
app.post("/api", (request,response) => { 
    console.log("Made the POST")
    console.log(request.body)
    data = request.body
    routesdb.insert(data)
})

// GET request to get the right graph for the client
app.get("/api", (request,response) => {
    timeWanted = "time1"
    if (timeWanted === "time1"){
        graphsdb.find({}, (err, data) => {
            response.json(data)
        })
    }
})