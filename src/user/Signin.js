import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";
import Loading from "../core/Loading";
import "../styles.css"



const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password : "",
        error:"",
        success : false,
        loading : false,
        redirect : false,   
    })

    const {email, password, error, success, loading, redirect} = values;
    const {user, token} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error:false, success:false, [name]:event.target.value})
    }
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, success:false, loading:true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success:false, loading:false})
            }
            else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        email:"",
                        password:"",
                        error:"",
                        loading:false,
                        success:true,
                        redirect:true,
                    })
                })
                
            }
        })

    }

    const successMessage = () => {
        if(success){
            alert("You are loged in")
        }
    }
    const errorMessage = () => {
        return (
            <div style={{display: error ? "":"none"}}>
               <p className="error">
                   {error}
               </p>
           </div>
        )
    }
    const didLoading = (loading) => {
        if(loading){
            return <Loading type="spin" width={50} height={50} color="#2874A6"/>
        }
    }
    const didRedirect = () => {
        if(redirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    const signinForm = () => {
        return (
        <div className="login">
                
                <form>
                {errorMessage()}
                {successMessage()}
                <div className="loading">
                {didLoading(loading)}
                </div>
                    <label>Email</label><br/>
                    <i className="fa fa-envelope"></i>
                    <input type="text" onChange={handleChange("email")} value={email}/><br/>
                    <label>Password</label><br/>
                    <i className="fa fa-key"></i>
                    <input type="password" onChange={handleChange("password")} value={password}/>
                    <button onClick={onSubmit}>Sign In</button>
                </form>
                <p className="account">Don't have account? <Link to="/signup">Sign Up</Link> here</p>
            </div>
        )
    }
    return (
        <Base>
            
            <p style={{color:"green", textAlign:"center", fontSize:"20px"}}>If you want to know how admin area works login with email: coder@gmail.com, password: C@der8106</p>
            {signinForm()}
            {didRedirect()}
            
        </Base>
    )
}


export default Signin;