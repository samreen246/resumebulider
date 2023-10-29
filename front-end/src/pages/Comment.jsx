import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Comment = () =>{

    const [statement,setStatement] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    function DoneComment(){
        fetch(`http://localhost:5000/comment/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                statement:statement,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.message){
                Swal.fire({
                    icon:"success",
                    title:data.message,
                })
                
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
        <div>
            <Navbar/>
            <div className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="shadow border rounded px-3 py-2 my-4">
                        <h3 className="mb-3">Comment</h3>
                        <textarea cols="79" rows="10" value={statement} onChange={e=>setStatement(e.target.value)} className="form-control mb-3" placeholder="Write your comment"></textarea>
                        <button className="form-control bg-dark text-light" onClick={()=>DoneComment()}>Done</button>
                    </div>  
                </div>
                <div className="col-lg-3"></div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Comment