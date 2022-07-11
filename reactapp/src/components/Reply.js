import React, { useState, useEffect } from 'react';
import '../styles/comment.css';
import data from '../data.json';
import AddReply from './AddReply';
import Modal from './Modal';
import useModal from '../hooks/useModal';

export default function Reply(props) {

    const [currentUser, setCurrentUser] = useState(data.currentUser);
    const [likeReply, setLikeReply] = useState(props.score);
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const {isShowing, toggle} = useModal();
    const {contentUpdate, setContentUpdate} = useState('')

    //Get the date in a good format:
    let dateFormat = function (date) {
        var dates = new Date(date);
        return dates.toLocaleDateString("fr")
    }

    // If user connected add a tag "you" and "delete" + "edit" button instead of reply !
    let tagYou;
    let actionBtn;
    if (currentUser.username === props.userName) {
        tagYou = (<p className='youtag'>you</p>)
        actionBtn = (<div className='youaction'>
            <img src='../images/icon-delete.svg' alt='delete' className='action-icon' />
            <p className='deleteAction'
            onClick={toggle}
            >Delete</p>
            <Modal isShowing={isShowing} hide={toggle} replyID={props.replyID}/>
            <img src='../images/icon-edit.svg' alt='edit' className='action-icon' />
            <p className='action'
                onClick={() => updateComment()}>Edit</p>
        </div>)

    } else {
        actionBtn = (<div className='reply'
            onClick={() => showReplyBox()}>
            <img src='../images/icon-reply.svg' alt='reply' className='action-icon' />
            <p className='action'>Reply</p>
        </div>)
    }

    // Show the replybox to update comment
    let editComment;
    let updateComment = () => {
        setEdit(!edit)
    }
    if (edit === true) {
        editComment = (<div className='editContent'><textarea
            className='inputEditComment'
            value={contentUpdate}
            onChange={(e) => setContentUpdate(e.target.value)}
        >{props.content}</textarea>
            <button style={{ alignItems: "flex-end", margin: '15px', }}
            onClick={async()=> {
                const request = await fetch(`/edit-content/`, {
                    method:  "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `id=${props._id}&content=${contentUpdate}`
                })
                const data = await request.json()
            }}
            >UPDATE</button></div>)
    } else {
        editComment = (<div className='content'>
            <p><span style={{ color: 'hsl(238, 40%, 52%)', fontWeight: '500' }}>@{props.replyingTo} </span>{props.content}</p>
        </div>)
    }

    // Show a replyBox to reply to a comment 
    let showReplyBox = () => {
        setReply(!reply)
    }
    let replyBox;
    if (reply === true) {
        replyBox = <AddReply commentID={props.id} replyingTo={props.userID}/>
    }

    return (
        <div className='repliesList'>
            <div className="replyComment">
                <div className='countButton'>
                    <img src="../images/icon-plus.svg" alt='plus'
                        onClick={() => setLikeReply(likeReply + 1)} />
                    <p style={{ color: 'hsl(238, 40%, 52%)', fontWeight: '500' }}>{likeReply}</p>
                    <img src='../images/icon-minus.svg' alt='minus'
                        onClick={() => setLikeReply(likeReply - 1)} />
                </div>
                <div className='userComment'>
                    <div className='commentHead'>
                        <div className='userInfo'>
                            <img className='avatar' src={props.avatar} alt='avatar' />
                            <p className='username'>{props.userName}</p>
                            {tagYou}
                            <p className='date'>{dateFormat(props.createdAt)}</p>
                        </div>
                        {actionBtn}
                    </div>
                    {editComment}
                </div>
            </div>
            {replyBox}
        </div>
    )
}