const moment = require('moment');
const date = moment();
const genrateMessage = (from , text) =>{
    return {
        from,
        text,
        createdAt : date.valueOf()
    }
}
const genrateLocationMessage = (from , lat , long) =>{
    return {
        from,
        link : `https://www.google.com/maps?q=${lat},${long}`,
        createdAt : date.valueOf()
    }
}
module.exports={
    genrateMessage,
    genrateLocationMessage
}