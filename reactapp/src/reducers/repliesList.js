export default function (repliesList = [], action){
    if(action.type === 'addReply'){
        let repliesListCopy = [...repliesList];
        repliesListCopy.push(action.reply)
        return repliesListCopy
    } else if (action.type === 'loadRepliesList'){
        return action.list
    }else {
        return repliesList
    }
}