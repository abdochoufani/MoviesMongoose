const express = require('express')
const router  = express.Router()
const movies=require("../models/movie.js")




router.get("/movies",(req,res)=>{
    movies.find({},(err,movie)=>{
        if(err) res.send(err)
        else res.render("movies/index.hbs", {movie})
    })

 })


router.get("/movie/:id", (req, res)=> {
    console.log("cheeeeck")
    if(req.params.id){
        movies.findById(req.params.id, (err, movie)=>{
            if(err) console.log(err)
            else  res.render('movies/show.hbs', {movie})
        })
    }
    else {
      res.render("movies/index.hbs", {movie})
    }
})


router.get("/movies/new",(req,res)=>{
    res.render("movies/new.hbs")
})

router.post("/movies",(req,res)=>{
    const { title, genre, plot } = req.body;
    const newMovie= new movies({
        title, 
        genre,
        plot  
    })
    newMovie.save().then(()=>{
        res.redirect("movies")
    })
    .catch(()=> {
        res.send("error")
    })
})

router.post("/movies/:id/delete",(req,res)=>{
    movies.findByIdAndDelete(req.params.id, (err)=>{
        if(err) console.log(err)
         else res.redirect("/movies")
    })

})


router.get("/movie/:id/edit",(req,res)=>{
    movies.findById(req.params.id,(err,movie)=>{
        if(err) console.log(err)
        else res.render("movies/edit.hbs", {movie})
    })
})


router.post("/movie/:id",(req,res)=>{
    const update={
        title:req.body.title,
        genre:req.body.genre,
        plot:req.body.plot
    }
    movies.findByIdAndUpdate(req.params.id, update, (err) => {
        if (err){ return next(err); }
        res.redirect('/movies');
      });
})





module.exports =router