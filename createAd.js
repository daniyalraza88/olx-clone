import { TextField, Button } from "@mui/material"
import { auth, db } from "../config/firebase"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { storage } from "../config/firebase"
// import { Ref } from "react"
import { ref } from "firebase/storage"
import { uploadBytes } from "firebase/storage"
import { getDownloadURL } from "firebase/storage"



function CreateAd(props) {

    const arr = []
    function back() {
        props.setScreen("dashboard")
        console.log(images)
        // arr.push(images)
        // setImages(arr)
        // console.log(images)

        // images.map((val,ind)=>{
        //     console.log(val[0])
        // })


    }
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([])
    var imgArr = [];
    // let uid = auth.currentUser.uid

    const adsCollectionRef = collection(db, "Ads")
    const uid = auth.currentUser.uid;
    const email = auth.currentUser.email;

    // const imgRef = ref(storage, `adImages/${uid}` )


    // checking
    let newImgArr = [];




    const postAd = async ()=>{
        if (title == "" || price == "" || description == "") {
            console.log("error")
            alert("Please fill all the fields")
            console.log(images)
        } else {
            try {
                console.log("just checking")
                console.log(images)
                // var arr = []
                // console.log(arr.length)
                const a = images.length;
                console.log(a)
                // images.map(()=>{
                //     console.log("hell")
                // })
               
                for (let i = 0; i < a; i++) {
                    const imgRef = ref(storage, `adImages/${email + i}`)
                    const upl = await uploadBytes(imgRef, images[i])
                    const imageUrl = await getDownloadURL(upl.ref)
                    imgArr.push(imageUrl)
                    console.log(imgArr)
                }

                let finalArr = [...imgArr]
                


             


                await addDoc(adsCollectionRef, { Title: title, Price: price, Description: description, Images: finalArr, userId:uid })
            
                // alert("ad posted")
                props.setScreen("dashboard")

            } catch (err) {
                console.log(err)
            }
        }

    }


    return <div id="createAd"> <br></br> Post your own Ad in two minutes! <Button onClick={back} color="secondary" > Go back </Button>
        <br></br> <br></br>
        <TextField placeholder="Title.." onChange={(e) => { setTitle(e.target.value) }} />  <br></br> <br></br>
        <TextField placeholder="Description.." onChange={(e) => { setDescription(e.target.value) }} /> <br></br> <br></br>
        <TextField placeholder="Price.." onChange={(e) => { setPrice(e.target.value) }} /> <br></br> <br></br>
        <label for={"inp"} > Pictures: </label>
        <input type="file" id="inp" multiple onChange={(e) => { setImages(e.target.files) }} />

        <br></br> <br></br>
        <Button onClick={postAd} > Post your Ad </Button>

        {/* {
            images.map((val,ind)=>{
                return <img src={val} />
            })
        } */}



        {/* <button onClick={checking} > checking </button> */}

    </div>
}

export { CreateAd }