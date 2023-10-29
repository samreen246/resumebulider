import React, { useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const  Addpost = () => {

    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const navigate = useNavigate()

    function Addpost(){
        fetch("http://localhost:5000/create-post",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                title:title,
                content:content,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.message){
                Swal.fire({
                    icon:"success",
                    title:data.message,
                })
                navigate('/home')
            }
            else{
                Swal.fire({
                    icon:"error",
                    title:data.error
                })
            }
        })
    }

    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="shadow border rounded px-3 py-2 my-4">
                        <h3 className="mb-3">Add a post</h3>
                        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="form-control mb-3" placeholder="Enter Post Title"/>
                        <textarea cols="79" rows="10" value={content} onChange={e=>setContent(e.target.value)} className="form-control mb-3" placeholder="Enter Post Content"></textarea>
                        <button className="form-control bg-dark text-light" onClick={()=>Addpost()}>Add Post</button>
                    </div>  
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
        </>  
    )
}

export default Addpost