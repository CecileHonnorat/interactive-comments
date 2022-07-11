var express = require('express');
var router = express.Router();

var request = require('sync-request');

var mongoose = require('mongoose');
const commentModel = require('../models/comments')
const replyModel = require('../models/replies');
const userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// SignUp
router.post('/signup', async function(req, res, next){

  let error = "";
  let result = false;
  let newUser;
  let userSaved;

  if (req.body.username === ''){
    error = 'empty field'
  }

  let data = await userModel.findOne({
    username: req.body.username
  })

  if(data !=null){
    error = 'user already exists !'
  } else {
    newUser = await userModel({
      username: req.body.username
    })
    result = true
    userSaved = newUser.save()
  }

  res.json({error, result, userSaved})
})

// Add picture's profil
router.post('/add-picture/:id', async function(req, res, next){

   let result = false;
   let error = '';

  let user = await userModel.findById({
    _id: req.params.id
  })
  user.image.png = req.body.png
  user.image.webp = req.body.webp

  let userUpdated = user.save()
  if (userUpdated){
    result = true
  } else {
    error= 'something went wrong'
  }
  res.json({error, result, userUpdated})
})

// Add comments 
router.post('/add-comment', async function(req, res, next){
  let user = await userModel.findById(req.body.userID)
  console.log(req.body)
  let newComment = await commentModel({
    content: req.body.content,
    createdAt: Date.now(),
    user: req.body.userID,
    score: req.body.score,
  })

  let commentSaved = await newComment.save()
  commentSaved.user = user

  console.log(user)
  res.json({result: true, commentSaved})
})

// Add reply
router.post('/add-reply/:commentID', async function (req, res, next){
let commentID = await commentModel.findById(req.params.commentID)

console.log(req.body)
  let newReply = await replyModel({
    content: req.body.content,
    createdAt: Date.now(),
    score: req.body.score,
    user: req.body.userID,
    replyingTo: req.body.replyingTo
  })

  let replySaved = await newReply.save()

  commentID.replies.push(replySaved)
  let userSaved = commentID.save()

  res.json({result:true, replySaved, userSaved})
})

// Get comment & replies
router.get('/get-comments/', async function (req, res, next){
  let comments = await commentModel.find().populate('replies').populate('user').exec()
  let replies = await replyModel.find().populate('user').populate('replyingTo').exec()

  res.json({comments, replies})
})

// Edit Comment 
router.put('/edit-content', async function(req, res, next){
  console.log(req.body)
let reply = await replyModel.updateOne(
  {_id: req.body.id},
  {content: req.body.content}
)

replyUpdate = await replyModel.findById(req.body.id).exec()

res.json({agendaUpdate})
})

// Delete reply
router.delete('/delete-reply/:replyID', async function(req, res, next){
  let replies = await replyModel.deleteOne({_id: req.params.replyID})

  console.log(req.params)
  res.json(replies)
})
module.exports = router;
