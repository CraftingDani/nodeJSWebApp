const express = require("express")
const router = express.Router()

router.use(loger)

function loger(req, res, next)
{
    console.info(`request: ${req.url}`)
    next()
}

router.get("/", function(req, res)
{
    res.render("main")
})

router.get("/users/:id", function(req, res)
{
    res.send(`U wanted user ${req.params.id}`)
})



module.exports = router
