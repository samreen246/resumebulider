import React, {useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
//useState is used : instead of manipulating individual pieces of the UI directly you describe the different states that your components cab be in and switcg between them in resonse to the user input
const [name,setName] = useState('')
const [mail,setMail] = useState('')
const [password,setPassword] = useState('')
const navigate = useNavigate()

  function signup(){
    fetch("http://localhost:5000/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json" //telling type of data we are sending : here it is json 
      },
      body:JSON.stringify({ //converts data into json
        name:name,
        email:mail,
        password:password
      })
    })
    .then(res=>res.json()) //(we can have type of response what we have in backend) we get two type of respone : from backend (error or success)
    .then(data=>{
      if(data.error){
        Swal.fire({
          icon:"error",
          title:data.error
        })
      }
      else{
        Swal.fire({
          icon:"success",
          title:data.success
        })
        navigate('/login')
      }
    })
  }

return (
  <div className='container'>
    <div className="row">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <div className="shadow border rounded py-3 px-3 mt-5">
          <h4>Create your account</h4>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" className="form-control mt-3"/>
          <input type="text" value={mail} onChange={(e)=>setMail(e.target.value)}  placeholder="Enter your email" className="form-control mt-3"/>
          <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter password" className="form-control mt-3"/>
          <button className="btn btn-dark mt-3 form-control" onClick={()=>signup()}>Signup</button>
          <Link to='/login'><div className="text-center mt-3">I have a account ? Login</div></Link>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
  </div>
);
}

export default Signup