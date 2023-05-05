
// import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from "@mui/material";
import img from "../images/search.PNG"
import { signOut } from "firebase/auth";
// import SearchIcon from "@mui/icons-material/Search";
import { db } from "../config/firebase"
import { getDocs, collection } from "firebase/firestore";
import { MyAds } from "./myAds";
// import {Button} from "@mui/material"

// import SearchIcon from "@mui/material"
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

function Dashboard(props) {
    const [dbads,setDbads] = useState([]);
    const [searchAd,setSearchad] = useState("")
    const [searchedAd,setSearchedad] = useState([])
    const [back,setBack] = useState("no back")
    const [copyData,setCopydata] = useState([])
    
    
    function keyDown(event){
        // const a = event;
        // console.log(event.key)

        
        
        if(event.key == 'Backspace'){
            setBack("back")
            // console.log(event.target.value)
            setSearchad(event.target.value)
            const getData = async () => {
                try {
                    const data = await getDocs(adsCollectionRef)
                    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    // console.log(filteredData)
                    setCopydata(filteredData)
                    // keyDown()
                    // console.log(dbads)
        
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
        
                getData();

            


                let finalArr = [];
        // console.log("search")
        // console.log(searchAd)
        copyData.map((val,ind)=>{
            
            if(val.Title.includes(searchAd)){
                finalArr.push(val)
                // finalArr = [...finalArr,val]
            }
            setDbads(finalArr)
            // console.log(val.Title.includes(searchAd))
        })
            
            
            // finalArr.pop();
            // setDbads(finalArr)
            
            
            
            // console.log("keydown")
        } 
        
        
        else{
            search()
        }
    }
    
    
    function search() {
        let finalArr = [];
        // console.log("search")
        // console.log(searchAd)
        dbads.map((val,ind)=>{
            
            if(val.Title.includes(searchAd)){
                finalArr.push(val)
                // finalArr = [...finalArr,val]
            }
            setDbads(finalArr)
            // console.log(val.Title.includes(searchAd))
        })
    }
    


    function createAd() {
        // console.log("create an add")
        props.setScreen("")
    }

    function myProfile(){
        props.setScreen("profile")
  

    }
  

    const adsCollectionRef = collection(db, "Ads")
    
    useEffect(() => {

        // console.log("use effect chala")
        const getData = async () => {
        try {
            const data = await getDocs(adsCollectionRef)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // console.log(filteredData)
            setDbads(filteredData)
            keyDown()
            // console.log(dbads)

            }
            catch (err) {
                console.log(err)
            }
        }

        getData();
        // console.log(dbads)


    }, [])

    function myAds(){
        // console.log("myads")
        props.setScreen("myAds")
    }



    function login() {
        props.setScreen("login")
        // setScreen1("no")
    }
    function signup() {
        props.setScreen("signup")
        // setScreen1("no")

    }
    async function Logout() {
        // console.log(auth?.currentUser?.email)
        await signOut(auth)
        // console.log(auth?.currentUser?.email)
        props.setScreen1(true)

    }

    return <div id="dashboardDiv" >
        {/* <button onClick={getAds} >get ads</button> */}

        <TextField placeholder="Search anything . . " size="small" id="searchBar"  sx={{
        width: 500
    }} onChange={(e)=>{
            setSearchad(e.target.value);
            // keyDown(e) 
            
        
        }} onKeyDown={keyDown}  ></TextField>  <img onClick={search} id="icon" src={img} alt="abc" />
        <div id="logSinButts">

            {props.screen1 === true ? <div  >
                <Button onClick={login} > Login </Button>
                <Button onClick={signup}> Sign up </Button> </div> :
                <div id="threeButts"> <Button onClick={createAd}> Post your Ad </Button> <Button onClick={Logout} > Sign Out </Button> <Button onClick={myProfile} > My Profile </Button> <Button onClick={myAds}> My Ads </Button> </div>
            }

        </div>
        <br></br> <br></br>
        <div id="ads" >


            {/* {
                dbads.map((val, ind) => {
                    return <div id="specificAd" key={ind}>  <img id="adImg" alt="abc" src={val.images[0]} />  <label id="title" > {val.title} </label> <br></br> <label>  {val.description} </label> <br></br> <br></br> Price:  {val.price}   </div>
                })
            } */}

            {
                dbads.map((val,ind)=>{
                    return <div key={ind} id="uniqueAd" > <h2>{val.Title}</h2> <p> {val.Description} </p> {val.Images.map((val,ind)=>{return <label> <img id="productImg" src={val} /> </label>  })} <h3>{val.Price}</h3> </div>
                })

            }

        </div>
    </div>
}

export default Dashboard;