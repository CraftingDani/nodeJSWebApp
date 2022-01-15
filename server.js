// Code() by CraftingDani;


//-- constants --\\

const mysql = require("mysql2")
const express = require("express")

const router = require("./router.js")

const port = 187
const server = express() //aka "app"


//-- setup server --\\

server.listen(port)
server.set("view engine", "ejs")
server.use("/", router) //implements "router.js"
server.use(express.static("static")) //imports css/js from "static"

server.get("/*", function(_req, res, ) //error page
{
    const statusCode = 404
    res.status(statusCode).render("error", {statusCode: statusCode})
})

console.log(`%cDone. Server running at localhost:${port}`, "color: #00BFFF")
