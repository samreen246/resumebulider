import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const navigate = useNavigate()
    //const paramaters =useParams() : using destruture instead of creating object as we are doing : {parameters.id}
    const {id} = useParams() //useparams is used to fetch any parameters from url

    function update(){
        fetch(`http://localhost:5000/update/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
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
                navigate('/my-post')
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
        <div>
            <Navbar/>
            <div className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="shadow border rounded px-3 py-2 my-4">
                        <h3 className="mb-3">Edit post {id}</h3>
                        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="form-control mb-3" placeholder="Enter Post Title"/>
                        <textarea cols="79" rows="10" value={content} onChange={e=>setContent(e.target.value)} className="form-control mb-3" placeholder="Enter Post Content"></textarea>
                        <button className="form-control bg-dark text-light" onClick={()=>update()}>Update</button>
                    </div>  
                </div>
                <div className="col-lg-3"></div>
            </div>
            </div>
        </div>
    )
}

export default Update