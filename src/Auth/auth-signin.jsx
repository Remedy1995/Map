
import React, { useContext } from "react";
import jwtDecode from "jwt-decode";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Userpool from "../User/Userpool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { UserContext } from "../User/userContext";
import Dashboard from "../Screens/dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthSignIn = () =>{
    const [loading , setLoading] = useState(false);
    const  navigate = useNavigate();
    const [ email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [logged] = useContext(UserContext);
    
    const submitForm = (e) => {
    e.preventDefault();
    if (email.length < 1 || password.length < 1 ){
    toast.error("input field cannot be empty");
    }
    else {
    setLoading(true)
    const user = new CognitoUser({
        Username :  email,
        Pool     :  Userpool
    });

    const authDetails = new AuthenticationDetails({
        Username : email ,
        Password : password
    })
    //authenticate the user using aws icognito 
        user.authenticateUser(authDetails , { 
        onSuccess : (data) => {  
        const tokenKey  =  data?.getIdToken().getJwtToken();
        localStorage.setItem("token_key",tokenKey);
        const {email}  =  jwtDecode(tokenKey);
        console.log(email)
        localStorage.setItem("email",email);
        //navigate to the dashboard
         navigate("/dashboard");
         window.location.reload(false);
        },
        onFailure : (err) =>  { 
          
        setTimeout(()=> {
        setLoading(false)
        if(err){
        toast.error('An error occured or invalid credentials provided');
        }
           },1000); 
        }
    })
 }
 }
  return (   
        logged?<Dashboard/>:<div>
       <section className="w3l-hotair-form">
        <div className="container">
            <div className="workinghny-form-grid">
                <div className="main-hotair">
                    <div className="content-wthree">
                        <h2>My Map</h2>
                      
                        <form >
                            <input type="text" className="text" name="text" value={email}  onChange={(e)=>{
                                setEmail(e.target.value); }} placeholder="User Name"  />
                            <input type="password" className="password" onChange={(e)=>{
                                setPassword(e.target.value)
                            }} value={password} placeholder="User Password" />
                            <button className="btn" type="submit" onClick={submitForm} disabled={loading}>{loading?"loading...":"Log In"}</button>
                        </form>
                    </div>
                    <div className="w3l_form align-self">
                        <div className="left_grid_info">
                            <img src="images/1.png" alt="" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright text-center">
            <p className="copy-footer-29">© 2022 All rights reserved | Design by <a
                        href="#a">My Map</a></p>
        </div>
    </section>
    <ToastContainer/>
        </div>  
              
        );
}

export default AuthSignIn;