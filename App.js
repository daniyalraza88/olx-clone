import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import {Login} from './components/login'
import {Signup} from './components/signup'
import { CreateAd } from './components/createAd';
import { Profile } from './components/myProfile';


import { useState } from 'react';
import { MyAds } from './components/myAds';

function App() {

  const [screen,setScreen] = useState("dashboard");
  const [screen1, setScreen1] = useState(true);



  return (
    <div >
      <header className="App-header">
        { 
        screen == "dashboard" ?
          <Dashboard setScreen={setScreen} setScreen1= {setScreen1} screen1={screen1}/> :
          screen == "login" ?
       <div><Login setScreen={setScreen} setScreen1 = {setScreen1} screen1={screen1}/></div>    :
          screen == "signup" ?
          <div><Signup setScreen={setScreen} setScreen1 = {setScreen1} screen1={screen1}/></div> :

          screen == "profile" ?
          <div> <Profile setScreen={setScreen}/> </div>:
          screen == "myAds" ?
          <div> <MyAds setScreen={setScreen}/> </div> 
          :
          <div> <CreateAd setScreen={setScreen} /> </div>


        }
       
      </header>
    </div>
  );
}

export default App;
