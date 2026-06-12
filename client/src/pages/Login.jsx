import { useState } from "react";

import { FaEye } from "react-icons/fa";

import API from "../api/axios";

import "./Login.css";

import fitnessImage
from "../assets/fitness.jpg";

export default function Login(){

const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const submit =
async(e)=>{

e.preventDefault();

try{

const res =
await API.post(

"/auth/login",

{
email,
password
}

);

localStorage.setItem(
"token",
res.data.token
);

localStorage.setItem(
"user",
JSON.stringify(
res.data.user
)
);

window.location =
"/dashboard";

}catch(error){

alert(

error.response?.data?.message ||

"Login Failed"

);

}

};

return(

<div className="login-page">

<div className="login-container">

<div className="login-left">

<div className="logo">

e

<span>

Fitness Booking Platform

</span>

</div>

<form
className="login-form"
onSubmit={submit}
>

<h2>

Log in

</h2>

<div
className="input-group"
>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

/>

</div>

<div
className="input-group"
>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

/>

</div>

<div
className="options"
>

<label>

<input
type="checkbox"
/>

 Keep me logged in

</label>

<a href="#">

Forgot password?

</a>

</div>

<button
className="login-btn"
>

Log In

</button>

<div
className="register-link"
>

Don't have an account?

<a href="/register">

 Register

</a>

</div>

</form>

<div
className="footer-links"
>

Terms of Use |
Privacy Policy

</div>

</div>

<div
className="login-right"
>

<img
src={fitnessImage}
alt="fitness"
/>

</div>

</div>

</div>

);

}