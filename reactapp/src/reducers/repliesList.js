export default function (repliesList = [], action){
    if(action.type === 'addReply'){
        let repliesListCopy = [...repliesList];
        repliesListCopy.push(action.reply)
        return repliesListCopy
    } else if (action.type === 'loadRepliesList'){
        console.log(action.list)
        return action.list
    } else if (action.type === 'deleteReply'){
        let repliesListCopy = [...repliesList];
        let position = null
        for(let i=0; i <repliesListCopy.length; i++){
            if(repliesListCopy[i]._id === action._id){
                position = i
                console.log(position)
            }
        }
        if(position !== null){
            repliesListCopy.splice(position, 1)
        }
        return repliesListCopy
    } else {
        return repliesList
    }
}