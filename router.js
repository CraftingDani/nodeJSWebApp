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
            if(error) throw error
            db.query(`SELECT name FROM nodeserver WHERE name = '${req.body.name}'`, function(error, results)
            {
                console.log(results.length)
                if(error) console.log("error with query")

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
        console.error("ERROR WHILE REGISTERING")
        throw error
    }
})


router.get("/login", function(req, res) //login
{
    res.status(200).render("login")
})

router.post("/login", urlencodedParser, async function(req, res) //login
{
    db.connect(async function(error)
    {
        if(error) console.log("database error")
        db.query(`SELECT password FROM nodeserver WHERE name = '${req.body.name}';`, async function(error, results)
        {
            if(error) console.log("database error")
            console.log(results[0].password)
            try
            {
                if(await bcrypt.compare(req.body.password, results[0].password))
                {
                    res.status(100).redirect("/")
                    console.log("pw true")
                    return
                }
                const statusCode = 401; //access denied
                res.status(statusCode).render("error", {statusCode: statusCode})
            }
            catch(error)
            {
                console.log("user not known")
            }
        })
    })
})


module.exports = router
