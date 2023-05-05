import { TextField, Button } from "@mui/material"
import { createUserWithEmailAndPassword } from "firebase/auth" 
import { useState } from "react"
import { auth, storage } from "../config/firebase"
import {ref,uploadBytes,uploadString} from "firebase/storage"
import { db } from "../config/firebase"
import { collection, doc, setDoc } from "firebase/firestore"
import { addDoc } from "firebase/firestore"
import { getDownloadURL } from "firebase/storage"


function Signup  (props)  {
    const [img,setImg] = useState(null)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [imgUrl,setImgurl] = useState("")
    
    
    async function signUpUser(){
     await createUserWithEmailAndPassword(auth,email,password)

    const usersCollectionRef =  doc(db, "Users", auth.currentUser.uid)
    console.log(auth.currentUser.uid)



    
    

    const uid = auth.currentUser.uid;
    console.log(uid)
        const imgRef = ref(storage, `images/${email}` )
        // const nameRef = ref(storage, `names/${email}` )

        // uploadString(nameRef,name).then(()=>{})

        // uploadBytes(imgRef,img).then(()=>{

        //   const imageRef1 = ref(storage,`images/${auth.currentUser.email}`)
        //   console.log(getDownloadURL(imageRef1))
  
      
        //  getDownloadURL(imageRef1)
        //   .then((url)=>{
        //       console.log(url)
        //       setImgurl(url)
        //   })
        // })
        // console.log(email,password)
        // // props.setScreen("dashboard")


        const imgUpload = await uploadBytes(imgRef,img)
        console.log(imgUpload)
        const imageUrl = await getDownloadURL(imgUpload.ref)
        console.log(imageUrl)


         

    try {
      await setDoc(usersCollectionRef, { userName:name,userEmail: email, userPassword:password,image:imageUrl})
      alert("Signed up successfully")
      props.setScreen1(false)

      props.setScreen("dashboard")
    
    } catch (err) {
      // console.log(err)
      alert("Please enter a valid Email and password")
    }
        
      }
      
      return <div id="onlySpecific">
    
    <TextField onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" label="Email" variant="outlined" size="small" /> <br></br> <br></br>
    <TextField onChange={(e)=>{setPassword(e.target.value)}} type="password" id="outlined-basic" label="Password" variant="outlined" size="small" /> <br></br> <br></br>
    <TextField id="outlined-basic" label="Name" onChange={(e)=>{setName(e.target.value)}} variant="outlined" size="small" /> <br></br>  <br></br>
    
   <div id="inpPic">
   Picture:  
  <input type="file" onChange={(e)=>{setImg(e.target.files[0])}} required />
   </div>
    

   <div id="loginButt" > <br></br> <Button id="signupButt" color="primary" onClick={signUpUser} >Signup</Button> </div> 
  
</div>
}

export {Signup}