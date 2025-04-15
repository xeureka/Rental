

const mongoose = require('mongoose')

// movie schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    }
})
 
// movie model
const Genre = new mongoose.model('Genre',genreSchema);


module.exports = {
    genreSchema,
    Genre
}