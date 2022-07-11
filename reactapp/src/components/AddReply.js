import React, {useState} from 'react';
import data from '../data.json'
import {useDispatch, useSelector} from 'react-redux'

export default function AddComment(props){
        
    const dispatch = useDispatch()

    const [content, setContent] = useState('');
    let commentID = props.commentID
    let replyingTo = props.replyingTo

    // Send new reply
    const sendReply = async () => {
        const replyData = await fetch(`/add-reply/${commentID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `content=${content}&userID=62bd7285235f78260ecd9cea&score=0&replyingTo=${replyingTo}`
        })
        const body = await replyData.json()
        dispatch({type:'addReply', reply : body.replySaved})
        setContent('')
    }

    return (
        <div className='addReply'>
            <img src={data.currentUser.image.png} alt='avatar' className='avatarMe'/>
            <textarea
            placeholder='Add a comment...'
            className='inputComment'
            onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={() => sendReply()}>REPLY</button>
        </div>
    )
}