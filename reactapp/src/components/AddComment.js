import React, { useState } from 'react'
import data from '../data.json'
import {useDispatch} from 'react-redux'

export default function AddComment(props) {

    const [content, setContent] = useState('');
    
    const dispatch = useDispatch()

    // Send a new comment
    const sendComment = async () => {
        const commentData = await fetch('/add-comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `content=${content}&userID=62bd7285235f78260ecd9cea&score=0`
        })
        const body = await commentData.json()
        dispatch({type:'addComments', comment : body.commentSaved})
        setContent('')
    }

    return (
        <div className='addComment'>
            <img src={data.currentUser.image.png} alt='avatar' className='avatarMe' />
            <textarea
                placeholder='Add a comment...'
                className='inputComment'
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={() => sendComment()}>SEND</button>
        </div>
    )
}