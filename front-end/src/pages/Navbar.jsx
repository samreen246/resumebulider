import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar(){

    const navigate = useNavigate()

    function logout(){
        localStorage.clear()
        navigate("/login")
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
            <h3 className="mx-3">Blog</h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ms-auto">
                <Link className="text-dark nav-link" to="/home"><h5>Home</h5></Link>
                <Link className="text-dark nav-link" to="/add-post"><h5>Add post</h5></Link> 
                <Link className="text-dark nav-link" to="/my-post"><h5>My post</h5></Link>
                <h5 className="text-dark nav-link" onClick={()=>logout()}>Logout</h5>
                </div>
            </div>
        </div>
        </nav>
    )
}

export default Navbar