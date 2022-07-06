
import React, { useState, useEffect } from 'react';
import '../styles/comment.css';

import AddReply from './AddReply';
import Reply from './Reply';

export default function Comment(props) {

    //Get the date in a good format:
    let dateFormat = function (date) {
        var dates = new Date(date);
        return dates.toLocaleDateString("fr")
    }

    const [like, setLike] = useState(props.score)
    const [reply, setReply] = useState(false)
    const [allReplies, setAllReplies] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const rawData = await fetch(`/get-comments/`);
            const data = await rawData.json();
            setAllReplies(data.replies)
        }
        loadData();
    }, [])

    let plusClick = () => {
        setLike(like + 1)
    }

    let minusClick = () => {
        setLike(like - 1)
    }

    // Show a replyBox to reply to a comment 
    let showReplyBox = () => {
        setReply(!reply)
    }
    let replyBox;
    if (reply === true) {
        replyBox = <AddReply commentID={props.id} replyingTo={props.userID}/>
    }

    let userRepName;
    let avatarRep;
    let replyingToName;
    let replyList = props.replies.map((rep, j) => {
        for (var i = 0; i < allReplies.length; i++) {
            if (allReplies[i]._id === rep._id) {
                userRepName = allReplies[i].user.username
                avatarRep = allReplies[i].user.image.png
                replyingToName = allReplies[i].replyingTo[0].username
            }
        }
        return (
            <div className='replies'>
                <Reply userName={userRepName} createdAt={rep.createdAt} content={rep.content} replyingTo={replyingToName} score={rep.score} avatar={avatarRep} commentID={rep.id}/>
            </div>)
    })

    return (
        <div className='commentsList' key={props.id}>
            <div className="comment">
                <div className='countButton'>
                    <img src="../images/icon-plus.svg" alt='plus'
                        onClick={() => plusClick()} />
                    <p style={{ color: 'hsl(238, 40%, 52%)', fontWeight: '500' }}>{like}</p>
                    <img src='../images/icon-minus.svg' alt='minus'
                        onClick={() => minusClick()} />
                </div>
                <div className='userComment'>
                    <div className='commentHead'>
                        <div className='userInfo'>
                            <img className='avatar' src={props.avatar} alt='avatar' />
                            <p className='username'>{props.userName}</p>
                            <p className='date'>{dateFormat(props.createdAt)}</p>
                        </div>
                        <div className='reply'
                            onClick={() => showReplyBox({commentID:props.id})}>
                            <img src='../images/icon-reply.svg' alt='reply' className='action-icon' />
                            <p className='action'>Reply</p>
                        </div>


                    </div>
                    <div className='content'>
                        <p>{props.content}</p>
                    </div>
                </div>

            </div>
            {replyBox}
            {replyList}
        </div>
    )
}