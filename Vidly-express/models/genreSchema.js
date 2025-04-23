const mongoose = require('mongoose')

// genre schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    }
})
 
// genre model
const Genre = new mongoose.model('Genre',genreSchema);



module.exports = {
    Genre,
    genreSchema
}