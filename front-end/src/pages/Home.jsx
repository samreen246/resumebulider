import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

const Home = () => {

    const [post,setPost] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:5000/all-post",{
            method:"POST",
            headers:{
                "authorization":"Bearer "+localStorage.getItem("token") //"Bearer " : there must be a space after Bearer
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                //console.log(data.error)
                Swal.fire({
                    icon:"warning",
                    title:"something went wrong"
                })
                navigate("/Login")
            }
            else{
                setPost(data.posts)
            }
        })    
    },[])
            
    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    {
                        post.map(item=>{
                            return(
                                <div className="shadow border rounded px-2 py-2 my-4">
                                    <h4>{item.title}</h4>
                                    <div className="mt-2 text-muted">{item.date}</div>
                                    <div className="fs-5">{item.content}</div>
                                    <Link to={`/comment/${item._id}`}><button className="mt-3 mb-2 btn btn-primary px-4" >Comment</button></Link>
                                </div>
                            )
                        })
                    }  
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
        </>
    )
}

export default Home