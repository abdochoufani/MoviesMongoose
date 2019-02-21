const express = require('express')
const router  = express.Router()
const celebrities=require("../models/celebrity.js")

router.get("/",(req,res)=>{
    celebrities.find({},(err,celebrity)=>{
        if(err) console.log(err)
        else res.render("celebrities/index.hbs", {celebrity})
    })
})

module.exports = router;