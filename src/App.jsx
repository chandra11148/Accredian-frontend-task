import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import './App.css'

function App() {
  

  return (
    <>
      
      <Routes>
            <Route exact path="/" element={<Register/>}></Route>
            <Route  path="/login" element={<Login/>}></Route>
        </Routes>      
    
    </>
  )
}

export default App
