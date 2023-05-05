import { TextField, Button } from "@mui/material";
import img from "../images/search.PNG"
import { signOut } from "firebase/auth";
// import SearchIcon from "@mui/icons-material/Search";
import { db } from "../config/firebase"
import { doc, getDocs, getDoc, collection, where, query, deleteDoc } from "firebase/firestore";
// import { MyAds } from "./myAds";
// import {Button} from "@mui/material"

// import SearchIcon from "@mui/material"
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";


function MyAds(props) {

    const uid = auth.currentUser.uid;
    const q = query(collection(db, "Ads"), where("userId", "==", uid));

    const [dbads, setDbads] = useState([]);
    const [myAds, setMyads] = useState([])
    let myadsArr = [];



    const adsCollectionRef = collection(db, "Ads")

    async function deleteAd(ind) {

        const documentId = ind; // replace with your document ID
        const documentRef = doc(db, 'Ads', documentId);
        deleteDoc(documentRef)
            .then(() => {
                alert('Document deleted successfully');
                props.setScreen("dashboard")
            })
            .catch((error) => {
                alert('Error deleting document:', error);
            });

        // const docRef = db.collection('Ads').doc(ind)
        // docRef.get().then((doc) => {
        //     // console.log("hell")
        //     if (doc.exists) {
        //     //   Document data is available in doc.data() object
        //     console.log(doc.data());
        // } else {
        //         console.log('No such document!');
        //     }
        //   }).catch((error) => {
        //     console.log('Error getting document:', error);
        //   });


        //     console.log("delete ad")
        //     console.log(ind)
        //     // console.log(myAds[ind])
        //     // const dlt = query(collection(db, "Ads"), where(doc.id, "==", ind));
        //     const docRef = doc(db, "Ads","2Kn0RWRZew1Wh31MVfYj")



    }

    useEffect(() => {
        // console.log("use effect chala")
        const getData = async () => {
            try {

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots

                    console.log(doc.id, " => ", doc.data());
                    // myadsArr.push(doc.data(doc.id))
                    myadsArr.push({ data: doc.data(), id: doc.id })

                });

                console.log(querySnapshot)
                // const data = await getDocs(adsCollectionRef)
                // const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                // console.log(filteredData)
                // setDbads(filteredData)
                // console.log(dbads)

                // dbads.map((val,ind)=>{
                //     // console.log(val.userId)

                //     if(val.userId===uid){
                //         console.log("my ad")
                //         myadsArr.push(val)
                //     }
                // })

                setMyads(myadsArr)





                // const newAds = [...ads]
                // newAds.push(filteredData)
                // setAds(newAds);

            }
            catch (err) {
                console.log(err)
            }
        }

        getData();
        console.log(dbads)




        // console.log("use effect")
        // const data =  getDocs(adsCollectionRef);
        // data.then(
        //     console.log(data)
        // )
        // console.log(data)
        // console.log("use effect")



    }, [])





    return <div>

        my Ads

        <button onClick={() => { props.setScreen("dashboard") }} > Back </button>
        {

            myAds ?
            myAds.map((val, ind) => {
                return <div key={ind} id="uniqueAd" >  <h2>{val.data.Title}</h2> <p> {val.data.Description} </p>  {val.data.Images.map((val, ind) => { return <label> <img id="productImg" src={val} /> </label> })} <h3>{val.data.Price}</h3> <Button onClick={() => { deleteAd(val.id) }} color="error" > Delete </Button> </div>
            })
             :
             <div> no ads </div>

            

           
           
            
        }

        

    </div>
}

export { MyAds }