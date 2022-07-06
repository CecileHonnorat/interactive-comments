export default function (commentsList = [], action){
    if(action.type === 'addComments'){
        let commentsListCopy = [...commentsList];
        commentsListCopy.push(action.comment)
        return commentsListCopy
    } else if (action.type === 'loadList'){
        return action.list
    }else {
        return commentsList
    }
}