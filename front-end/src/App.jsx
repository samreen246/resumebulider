import React from "react"
import Signup from "./pages/Signup"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Addpost from "./pages/Addpost";
import Mypost from "./pages/Mypost";
import Update from "./pages/Update";
import Comment from "./pages/Comment";

function App() {
  //CORS error =>Cross Origin Resource Sharing -> sharing of resources on same device on different ports (frontend : port 3000 & backend : port 5000 -> frontend trying to get data from backend) : nodejs doesn't allow to share data on differet ports on same machine // to share data or eliminate this error we have to install a dependency in our backend "cors"
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/add-post" element={<Addpost/>}/>
      <Route path="/my-post" element={<Mypost/>}/>
      <Route path="/update/:id" element={<Update/>}/>
      <Route path="/comment/:id" element={<Comment/>}/>
    </Routes>
  </BrowserRouter>
  )
  
}

export default App;
