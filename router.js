// Code() by CraftingDani;


//-- constants --\\

const express = require("express")
const mysql = require("mysql2")
const router = express.Router()
const db = mysql.createConnection
({
    host: "localhost",
    user: "nodeServer",
    password: "robotUsingMySQL2",
    port: 3306,
    database: "nodewebserver"
})


//-- functionality --\\

router.use(onRequest)

db.connect(function(error)
{
    if(error) throw error
    db.query("SELECT * FROM `nodeserver` WHERE id=1;", function(error, res)
    {
        if(error) throw error
        console.log(res)
    })
})

function onRequest(req, _res, next)
{
    console.info(`request: ${req.url}`)
    next()
}

router.get("/", function(_req, res)
{
    res.render("main")
})

router.get("/users/:id", function(req, res)
{
    res.send(`U wanted user ${req.params.id}`)
})



module.exports = router
