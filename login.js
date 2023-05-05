import { TextField,Button } from "@mui/material"
// import {Button} from "@mui/material"
import '../App.css'
import { signInWithEmailAndPassword } from "firebase/auth" 
import {auth} from "../config/firebase"
import { useState } from "react"



function Login (props){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    // const [error,setError] = useState("")
    // console.log(auth.currentUser.email)
   async function signInUser(){
    try{
        await signInWithEmailAndPassword(auth,email,password)
        console.log(email,password)
        
        props.setScreen("dashboard")
        props.setScreen1(false)


    } catch(err){ 
        // console.log(err)
        // setError(err)
        alert("Please enter correct email and password")
    }
    }


    return <div id="onlySpecific">
        <TextField onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" label="Email" variant="outlined" size="small" /> <br></br> <br></br>
        <TextField onChange={(e)=>{setPassword(e.target.value)}} type="password" id="outlined-basic" label="Password" variant="outlined" size="small" /> <br></br> <br></br>
       <div id="loginButt" > <Button color="primary" onClick={signInUser} >Login</Button> </div> 


        
    </div>
}
export {Login} 