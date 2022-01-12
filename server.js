//-- constants --\\

const mysql = require("mysql2")
const express = require("express")

const router = require("./router.js")

const port = 187
const server = express() //aka "app"

const db = mysql.createConnection
({
    host: "localhost",
    user: "nodeServer",
    password: "robotUsingMySQL2",
    port: 3306,
    database: "nodewebserver"
})


//-- setup server --\\

server.listen(port)
server.set("view engine", "ejs")
server.use("/", router)
server.use(express.static("static"))

db.connect(function(error)
{
    if(error) return console.error(error)
})

server.get("/*/", function(_req, res, ) //error page
{
    const errorCode = 404
    res.status(errorCode)
    res.render("error", {errorCode: errorCode})
})

console.info(`Server running at localhost:${port}`)
