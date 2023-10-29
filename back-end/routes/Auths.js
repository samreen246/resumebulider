const router = require ('express').Router()
const User = require ('../model/user') // model is imported of the schema
const jwt =require ('jsonwebtoken')
const verify = require ('../middleware/verifyuser')

//SIGNUP ROUTE
router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.json({error:"All fields are required"})
    }
    else{
        //check whether already exist or not
        User.findOne({email:email})
        .then(found=>{
            if(found){ //null is considered as false
                res.json({error:"email is already in used"})
            }
            else{
                //1.creating user
                const user = new User ({
                    name :name, //name (varaible) : name (provided by user) 
                    email:email, 
                    password:password
                })//User : defining schema , user : instance or object of schema , and all information is provided to it , and the save it
                //2.saving user
                user.save()
                .then(saved=>res.json({success:"user added"}))
                .catch(err=>console.log(err))
            }
        })   
    }
})

//LOGIN ROUTE
router.post("/login",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.json({error:"All fields are required"})
    }
    else{
        //token is generated while login (1. to validate the user , 2. user who posted-> (provided by) token)
        User.findOne({email:email})
        .then(found=>{
            if(found){ 
                //check whether that user exists or not
                if(found.password==password){ //verifying password
                    const token = jwt.sign({email:found.email},process.env.JWT_SECRET) //token will be generated and save in "token" variable
                    res.json({token:token})
                }
                else{
                    res.json({error:"invalid password"})
                }
            }
            else{
                res.json({error:"user not found"})
            }
        })
    }
})

//FETCHING LOGGED USER DATA
router.post("/details",verify,(req,res)=>{
    User.findOne({email:req.user.email})
    .then(found=>res.json({user:found}))
    .then(err=>console.log(err))
})

module.exports = router