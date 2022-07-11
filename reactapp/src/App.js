
import './App.css';
import React, {useEffect, useState} from 'react';

// Components :
import Comment from './components/Comment';
import AddComment from './components/AddComment';

// Redux and Reducers ...
import {useSelector, useDispatch} from 'react-redux';


function App() {

  const dispatch = useDispatch()

  const comments = useSelector(state => state.commentsList)

  useEffect(()=> {
    const loadData = async () => {
      const rawData = await fetch(`/get-comments/`);
      const data = await rawData.json();
      dispatch({ type : 'loadList', list: data.comments})
    }
    loadData();
  }, [])

  console.log(comments)
  let commentsList = comments.map((com, i) => {
    return (
      <Comment userName={com.user.username} createdAt={com.createdAt} avatar={com.user.image.png} content={com.content} replies={com.replies} score={com.score} id={com._id} userID={com.user._id}/>
    )
  })


  return (
    <div className="App">
      {commentsList}
      <div className='commentSection'>
      <AddComment />
      </div>
    </div>
  );
}

export default App;
