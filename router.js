// Code() by CraftingDani;


//-- constants --\\

const express = require("express")
const mysql = require("mysql2")
const router = express.Router()
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: true});
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

function onRequest(req, _res, next)
{
    console.info(`new request at: ${req.url}`)
    next()
}


router.get("/", function(_req, res) //main
{
    res.status(200).render("main")
})


router.get("/register", function(req, res) //register
{
    res.status(200).render("register", {error: ""})
})

router.post("/register", urlencodedParser, async function(req, res) //register
{
    try
    {
        const hashedPw = await bcrypt.hash(req.body.password, 10)
        db.connect(function(error)
        {
            if(error)
            {
                const statusCode = 500
                res.status(statusCode).render("error", {statusCode: statusCode})
                console.error(error)
            }

            db.query(`SELECT name FROM nodeserver WHERE name = '${req.body.name}'`, function(error, results)
            {
                if(error)
                {
                    const statusCode = 500
                    res.status(statusCore).render("error", {statusCode: statusCode})
                    console.error(error)
                }

                if(results.length !== 0) //already taken
                {
                    res.status(200).render("register", {error: "Username is already taken!"})
                    return
                }

                db.query(`INSERT INTO nodeserver (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hashedPw}');`)
                res.status(201).redirect("/")
            })
        })
    }
    catch(error)
    {
        const statusCode = 500
        res.status(statusCode).render("error", {statusCode: statusCode})
        console.error(error)
    }
})


router.get("/login", function(req, res) //login
{
    res.status(200).render("login", {error: ""})
})

router.post("/login", urlencodedParser, async function(req, res) //login
{
    db.connect(async function(error)
    {
        if(error) console.log("database error")
        db.query(`SELECT password, email FROM nodeserver WHERE name = '${req.body.name}';`, async function(error, results)
        {
            if(error) console.log("database error")
            try
            {
                if((await bcrypt.compare(req.body.password, results[0].password)) && (results[1].email == req.body.email))
                {
                    res.status(100).redirect("/")
                    return
                }
                res.status(401).render("login", {error: "Wrong password or email!"})
            }
            catch(error)
            {
                res.status(401).render("login", {error: "User not registered!"})
            }
        })
    })
})


module.exports = router
