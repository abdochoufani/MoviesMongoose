const mongoose= require ('mongoose')
const Schema = mongoose.Schema
const Movie =mongoose.model('movies', 
new Schema({
    title : String, 
    genre :String, 
    Plot : String 
}))


module.exports =Movie