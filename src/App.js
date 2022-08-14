import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './Login';
import React,{ useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders';




const promise=loadStripe('pk_test_51LVAd3SAnn4zk80rJ2IHBN7XR6SF34LetTn0FYOFG6KaOC8o4UiZPUf5QBiMU9agr5WXuWSYHDV59ujHgnBPofA900RKsOXae5');
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(()=>{
    //this empty braces is because this function only run once when the app component loads
    const User = auth.currentUser;
    
    auth.onAuthStateChanged((User)=>{
      console.log("THE USER IS >>> ", User);
      if(User){
        //the user just logged in / the user was logged in
        console.log("Yes User") 
        dispatch({
          type: "SET_USER",
          user: User,
        });
  
      }else{
        //the user is logged out
        console.log("The user is not")
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
   
  },[])
  return (
    //BEM Convention
    <div className="app">
      {/* <Header/>
      <Home/> */}
      <Router>
        <Header/>
        <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Checkout" element={<Checkout />} />
        <Route exact path="/payment" element={<Elements stripe={promise}><Payment/></Elements>} />
        <Route exact path="/orders" element={<Orders />} />
        <Route  path="/" element={<Home />} />
        </Routes>
      </Router>
      
    </div>

  
  );
}

export default App;
