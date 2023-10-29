const express = require ('express')
const mongoose =require ('mongoose')  //Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. MongoDB is a schema-less NoSQL document database.

require ('dotenv').config()
const app = express()
const verifyuser = require ('./middleware/verifyuser')
const cors = require('cors')

//acess anything from env we right process.env.name
const port = process.env.PORT
//above line means : port = 5000

//may be someone can access it change port number, it is not easy but can be done, to secure it we use .env file to store critical information
//app.listen(5000,()=>console.log("App is running on port 5000"))

mongoose.connect(process.env.MONGO_URI)
.then(connected=>console.log("connected to mongoDB"))
.catch(err=>console.log(err))

app.use(cors())//we can share data between different ports
app.use(express.json())//middleware : nodejs does not understand json , therefore we use middleware to make nodejs to understand json //it is a middleware to make server understand received json data : if not used , error shown is : cannot destructure propertry , written always above the routes
app.use(require('./routes/Auths'))
app.use(require('./routes/Post'))


//TESTING MIDDLEWARE
app.post("/verify",verifyuser,(req,res)=>{
    res.json({user:req.user.email})
})

app.listen(port,()=>console.log("App is running on port",port))
