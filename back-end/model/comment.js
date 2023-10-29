const mongoose = require ('mongoose')

const Comm = mongoose.Schema({
    statement:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Comm',Comm)