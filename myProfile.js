import { auth, storage } from "../config/firebase"
import { useEffect, useState } from "react"
import { listAll, ref } from "firebase/storage"
import { getDownloadURL } from "firebase/storage"
import { db } from "../config/firebase"
import { collection, doc, getDocs,getDoc } from "firebase/firestore"


function Profile(props){
    const imageRef = ref(storage,`images/${auth.currentUser.email}`)
    

    const nameRef = ref(storage,`names/${auth.currentUser.email}`)

    const [userName1,setUsername] = useState("")
    
    const [userEmail,setUseremail] = useState("")
    const [userPicture,setPicture] = useState("")
    const [imgList,setImglist] = useState("")


    useEffect(()=>{

        const userNamesRef = doc(db, "Users",auth.currentUser.uid)
        // alert("data")
        const getUserData = async()=>{
            const userData = await getDoc(userNamesRef)
            console.log(userData.data().image)
            setUseremail(userData.data().userEmail)
            setUsername(userData.data().userName)
            setPicture(userData.data().image)
            

        }
        getUserData();
    // const getUsername= async () => {
    //     try {
    //             const name = await getDocs(userNamesRef,auth.currentUser.uid)
    //             const filteredData = name.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //             setUsername("filteredData[0].userName")

    //             console.log(userName1)
    //     } catch(error){
    //         console.log(error.message)
    //     }
    // }
    // getUsername()


        console.log(auth.currentUser.uid)
        // setUseremail(auth.currentUser.email)

        // const  imgUrl = async() = {  
        //    await getDownloadURL(imageRef)
        //  }

    //    async  function imgUrl (){
    //     await getDownloadURL(imageRef);
    //     console.log(getDownloadURL(imageRef))
    //    }
    //    imgUrl()

    // getDownloadURL(imageRef)
    // .then((url)=>{
    //     console.log(url)
    //     setPicture(url)
    // })

    // getDownloadURL(nameRef)
    // .then((url)=>{
    //     console.log(url)
    //     setUsername(url)
    // })


        // listAll(imageRef).then((response)=>{
        //     response.items.forEach((item)=>{
        //         getDownloadURL(item).then((url)=>{
        //             setImglist((prev)=>[...prev,url])
        //         })
        //     })
        //     console.log(response);
        // })

    },[])

    function backAds(){
        console.log("back ads")
        props.setScreen("dashboard")
    }


    return <div> <h1>My profile</h1> user name: <h6> {userName1} </h6>  <br></br> Email:  {userEmail} <br></br> <br></br> Profile picture: <br></br> <img id="profilePic" src={userPicture} /> <br></br> <button onClick={backAds} >back to Ads</button> </div>
}

export {Profile}