import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

    const Mypost = () => {

    const [post,setPost] = useState([])
    const [user,setUser] = useState({})

    useEffect(()=>{
        fetch("http://localhost:5000/details",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(data=>setUser(data.user))

        fetch("http://localhost:5000/my-posts",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(data=>setPost(data.data))
    },[post]) //due to deleting post  that component is updating

    function deletepost(id){
        let confirmation = window.confirm("Are you sure?")
        if(confirmation){
            fetch(`http://localhost:5000/delete-post/${id}`,{
                method:"POST",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                    Swal.fire({
                        icon:"success",
                        title:data.success
                    })
                }
                else{
                    Swal.fire({
                        icon:"success",
                        title:data.error
                    })
                }
            })
        }
    }

    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="h4 mt-4"><i><span className="text-primary">Full name : </span>{user.name}</i></div>
                    <div className="h4 my-3"><i><span className="text-primary">Email : </span>{user.email}</i></div>
                    <h3 className="mt-3">My posts </h3>
                    {
                        post.map(item=>{
                            return(
                                <div className="shadow border rounded px-2 py-2 my-4 bg-light">
                                    <h4>{item.title}</h4>
                                    <div className="mt-2 text-muted">{item.date}</div>
                                    <div className="fs-5">{item.content}</div>
                                    <Link to={`/update/${item._id}`}><button className="mt-3 mb-2 btn btn-primary px-4">Update</button></Link>
                                    <button className="mt-3 mb-2 btn btn-danger mx-3 px-4" onClick={()=>deletepost(item._id)}>Delete</button>
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

export default Mypost