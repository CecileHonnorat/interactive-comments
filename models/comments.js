var mongoose = require('mongoose')

var commentSchema = mongoose.Schema({
    id: Number,
    content: String,
    createdAt: { type: Date, default: Date.now() },
    score: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    replies: [{type: mongoose.Schema.Types.ObjectId, ref:'replies'}]
})

var commentModel = mongoose.model('comments', commentSchema)

module.exports = commentModel