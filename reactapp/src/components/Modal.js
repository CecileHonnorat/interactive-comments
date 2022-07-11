import React from "react";
import ReactDOM from "react-dom";
import '../styles/modal.css';

const Modal = ({ isShowing, hide, ...props }) =>
    isShowing
        ? ReactDOM.createPortal(
            <>
                <div className="modal-overlay">
                    <div className="modal-wrapper">
                        <div className="modal">
                            <div className="modal-header">
                                <h4>Delete comment</h4>
                            </div>
                            <div className="modal-body">Are you sure you want to delete this comment? This will remove the comment and can't be undeone.</div>
                            <div className="buttons">
                                <button className="cancel-btn" onClick={hide}>NO, CANCEL</button>
                                <button className='delete-yes' onClick={async () => {
                                        console.log('hey you!')
                                        const deleteRequest = await fetch(`delete-reply/${props.replyID}`, {
                                            method: 'DELETE',
                                        })
                                }
                                }>YES, DELETE</button>
                            </div>
                        </div>

                    </div>
                </div>
            </>,
            document.body
        )
        : null;

export default Modal;