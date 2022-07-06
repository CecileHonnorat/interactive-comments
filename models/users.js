var mongoose = require('mongoose')

var imageSchema = mongoose.Schema({
    png : String,
    webp : String
})

var userSchema = mongoose.Schema({
    image: {imageSchema},
    username: String,
    active: Boolean
    
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel