import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom"; //useNavigate : to redirect user from one page to other

const Login = () =>{

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate() 

  function login(){
    fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })
    .then(res=>res.json())
    .then(data=>{ //we will get either error or token from backend
      if(data.error){
        Swal.fire({
          icon:"error",
          title:data.error
        })
      }
      else{
        //localstorage is storage of browser
        localStorage.setItem("token",data.token) //variable : "token", what is to be stored is : data.token
        navigate("/home")
      }
    })  
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="shadow border rounded py-3 px-3 mt-5">
            <h4>Login to your account</h4>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" className="form-control mt-3"/>
            <input type="text" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" className="form-control mt-3"/>
            <button className="btn btn-dark mt-3 form-control" onClick={()=>login()}>Login</button>
            <Link to='/'><div className="text-center mt-3">I don't have a account ? Signup</div></Link>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
}

export default Login