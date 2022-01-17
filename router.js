// Code() by CraftingDani;



//-- constants --\\

const express = require("express")
const mysql = require("mysql2")
const router = express.Router()
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: true});
const db = mysql.createConnection({host: "localhost", user: "nodeServer", password: "robotUsingMySQL2", port: 3306, database: "nodewebserver"})

const authenticatedUsers = ["", "", ""]

//-- functionality --\\

router.use(onRequest)
router.use(urlencodedParser)

function onRequest(req, _res, next)
{
    console.info(`new request at: ${req.url}`)
    next()
}


router.get("/", function(req, res) //main
{
    if(authenticatedUsers.find(`USER IP`) != null) //logged in
    {
        res.status(100).redirect("/login")
        return
    }

    res.status(200).render("main")
})


router.get("/register", function(_req, res) //register
{
    res.status(200).render("register", {error: ""})
})

router.post("/register", async function(req, res) //register
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

            db.query(`SELECT name, email FROM nodeserver WHERE name = '${req.body.name}'`, function(error, results)
            {
                if(error)
                {
                    const statusCode = 500
                    res.status(statusCore).render("error", {statusCode: statusCode})
                    console.error(error)
                }

                if(results.length !== 0) //already taken
                {
                    res.status(200).render("register", {error: "Username or email is already taken!"})
                    return
                }

                db.query(`INSERT INTO nodeserver (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hashedPw}');`)
                res.status(201).redirect("/login")
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


router.get("/login", function(_req, res) //login
{
    res.status(200).render("login", {error: ""})
})

router.post("/login", async function(req, res) //login
{
    db.connect(async function(error)
    {
        if(error) console.error(error)
        db.query(`SELECT password, email FROM nodeserver WHERE name = '${req.body.name}';`, async function(error, results)
        {
            if(error) console.error(error)
            try
            {
                if((await bcrypt.compare(req.body.password, results[0].password)) && (results[0].email == req.body.email))
                {
                    res.status(100).redirect("/")
                    authenticatedUsers.push(`"${req.ip}"`)
                    return
                }
                res.status(401).render("login", {error: "Wrong password or email!"})
            }
            catch(error)
            {
                res.status(401).render("login", {error: "User not registered!"})
                console.log(error)
            }
        })
    })
})


module.exports = router
