var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var sessions = require('./authentication/sessions')
var authRoutes = require('./authentication/auth-routes')
var threadRoutes = require('./routes/thread-routes')
var userRoutes = require('./routes/user-routes')
var server = express();
var port = 3000;


//MIDDLEWARE
server.use(express.static(__dirname + "/public"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(sessions)

server.use('/', authRoutes)

server.use('/api/threads', threadRoutes)
server.use('/api/users', userRoutes)

server.listen(port, ()=>{
  console.log("starting up Node, on port 3000")
})

var dbConnect = require("./config/db/mlab-config");
