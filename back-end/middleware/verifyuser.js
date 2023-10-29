require('dotenv').config()
const jwt = require ('jsonwebtoken') 

function verifyuser(req,res,next){

    // verified than control goes to next()
    const BearerToken = req.headers['authorization'] //in header whichever token have to access, we pass it in the ['']
    //console.log(BearerToken)
   
    if(BearerToken){
        const allData = BearerToken.split(" ") //breaks string into parts and stored in array , and splited from the part that is passed in parameter
        const FinalToken = allData[1] //as array is return so we are accessing token by irs index value ,we will get only token here // 1 is index
        //console.log(FinalToken)

        // for verifying, key:to unlock (whether it is unlocking with this key or not from which the token is generated)
        jwt.verify(FinalToken,process.env.JWT_SECRET,(err,data)=>{
            if(err){
                res.json({error:"invalid token"})
            }
            else{
                //res.json({success:"valid token"})
                //console.log(data) //{ email: 'aftabgamil.com', iat: 1691677043 }
                req.user = data //global request variable ,in the compponents where this middleware will be called : this global request variable will be accessible // it is not a normal variable : it can only be access through server
                next()
            }
        })
    }
    else{
        res.json({error:"no token found"})
    }
    
    // when it was verified that aur request is valid then "next" sends control to the body of the function where middleware was introduce , then futher code will be execut of that function or body
}

module.exports = verifyuser