const express = require('express')
const router  = express.Router()
const celebrities=require("../models/celebrity.js")



router.get("/celebrities",(req,res)=>{
    celebrities.find({},(err,celebrity)=>{
        if(err) res.send(err)
        else res.render("celebrities/index.hbs", {celebrity})
    })

 })


router.get("/celebrity/:id", (req, res)=> {
    console.log("cheeeeck")
    if(req.params.id){
        celebrities.findById(req.params.id, (err, celebrity)=>{
            if(err) console.log(err)
            else  res.render('celebrities/show.hbs', {celebrity})
        })
    }
    else {
      res.render("celebrities/index.hbs", {celebrity})
    }
})

router.get("/celebrities/new",(req,res)=>{
    res.render("celebrities/new.hbs")
})



router.post("/celebrities",(req,res)=>{
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity= new celebrities({
        name, 
        occupation,
        catchPhrase  
    })
    newCelebrity.save().then(()=>{
        res.redirect("celebrities")
    })
    .catch(()=> {
        res.send("error")
    })

})


router.post("/celebrities/:id/delete",(req,res)=>{
    celebrities.findByIdAndDelete(req.params.id, (err)=>{
        if(err) console.log(err)
         else res.redirect("/celebrities")
    })

})




router.get("/celebrity/:id/edit",(req,res)=>{
    celebrities.findById(req.params.id,(err,celeb)=>{
        if(err) console.log(err)
        else res.render("celebrities/edit.hbs", {celeb})
    })
})


router.post("/celebrity/:id",(req,res)=>{
    const update={
        name:req.body.name,
        occupation:req.body.occupation,
        catchPhrase:req.body.catchPhrase
    }
    celebrities.findByIdAndUpdate(req.params.id, update, (err, celeb) => {
        if (err){ return next(err); }
        res.redirect('/celebrities');
      });
})




module.exports = router;