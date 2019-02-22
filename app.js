const express= require('express')
const bodyParser   = require('body-parser')
const path = require('path')
const mongoose= require ('mongoose')
const app= express()



mongoose.connect('mongodb://localhost/Movies', {useNewUrlParser: true})
  .then(x => {
    console.log("Connected to the database")
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const index = require('./routes/celebrities.js')
app.use('/', index);

const home= require('./routes/home.js')
app.use('/',home)

const movies = require("./routes/movies.js")
app.use("/",movies)


app.listen(3000)



module.exports = app