const router = require('express').Router()
const verify = require ('../middleware/verifyuser')
const Post = require('../model/post')
const Comm = require('../model/comment')

//CREATE-POST ROUTE
router.post("/create-post",verify,(req,res)=>{
    const{title,content} = req.body
    if(!title || !content){
        res.json({error:"All fields are required"})
    }
    else{
        const today = new Date()
        const year =today.getFullYear()
        let month = today.getMonth()+1  //in javascripts month starts from 0-11
        let dd = today.getDate()

        const formattedDate = dd+'/'+month+'/'+year
        const post = new Post({
            title:title,
            content:content,
            postedBy:req.user.email,
            date:formattedDate
        })
        post.save()
        .then(saved=>res.json({message:"Post created"}))
        .catch(err=>res.json(err))
    }
})

//SHOW ALL POST
router.post('/all-post',verify,(req,res)=>{
    Post.find()
    .then(found=>{
        if(found){
            res.json({posts:found})
        }
        else{
            res.json({error:"no post found"})
        }
    })
})

//SPECIFIC USER POST
router.post("/my-posts",verify,(req,res)=>{ //post from email where email we get from verify
    Post.find({postedBy:req.user.email})
    .then(found=>{
        if(found){
            res.json({data:found})
        }
        else{
            res.json({error:"no post yet"})
        }
    })
})

//DELETE POST
router.post("/delete-post/:id",verify,(req,res)=>{ // : -> requesting for a url parameter
    const {id} = req.params //fetching id from url  (params -> fetching something from url)
    //const{id} = req.body  -> passing id in body
    Post.deleteOne({_id:id}) 
    .then(deleted=>res.json({success:"post deleted"}))
    .catch(err=>res.json({error:"post was not deleted"}))
    
})

//EDIT POST
router.post("/update/:id",verify,(req,res)=>{
    const {id} = req.params
    const {title,content} = req.body

    Post.updateOne({_id:id},{
        //mongoDB operator : $set : with help od it we will update it
        $set:{
            title:title,
            content:content,
        }
    })
    .then(updated=>res.json({message:"Post updated"}))
    .catch(err=>res.json({error:"something went wrong"}))
})

//COMMENT ON POST
router.post("/comment/:id",verify,(req,res)=>{
    const {id} = req.params
    const {statement} = req.body
    if(!statement){
        res.json({error:"comment field is required"})
    }
    else{
        const comm = new Comm({
            statement:statement,
            email:req.user.email,
            postId:id
        })
        comm.save()
        .then(saved=>res.json({message:"comment saved"}))
        .then(err=>res.json(err))
    }
})

module.exports = router