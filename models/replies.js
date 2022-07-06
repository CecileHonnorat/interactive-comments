var mongoose = require('mongoose')

var replySchema = mongoose.Schema({
    id: Number,
    content: String,
    createdAt: { type: Date, default: Date.now() },
    score: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    replyingTo: [{type: mongoose.Schema.Types.ObjectId, ref:'users'}]
})

var replyModel = mongoose.model('replies', replySchema)

module.exports = replyModel