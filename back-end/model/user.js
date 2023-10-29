//for schema we need to import mongoose
const mongoose = require ('mongoose')

const User = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// exporting ,but before export we have to convert "schema" into "model" (nodejs does not understand schema or whatever is written above, therefore to make nodejs understand what is meaning of above code ) : schema :not understandable by nodejs , model : understandable by nodejs
module.exports = mongoose.model('User',User) //'User' : it is name of model by which it will be recognised , User : schema name which is to be converted in model