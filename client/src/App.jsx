import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {

BrowserRouter,

Routes,

Route

}

from

"react-router-dom";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import Dashboard
from "./pages/Dashboard";

import Classes
from "./pages/Classes";

import Trainers
from "./pages/Trainers";

import MyBookings
from "./pages/MyBookings";

import Recommendations
from "./pages/Recommendations";

import Profile
from "./pages/Profile";

import TrainerProfile
from "./pages/TrainerProfile";
import Payment
from "./pages/Payment";

function App(){

return(

<BrowserRouter>

<Routes>

<Route

path="/"

element={
<Login/>
}

/>

<Route

path="/register"

element={
<Register/>
}

/>

<Route

path="/dashboard"

element={
<Dashboard/>
}

/>

<Route

path="/classes"

element={
<Classes/>
}

/>

<Route

path="/trainers"

element={
<Trainers/>
}

/>

<Route

path="/bookings"

element={
<MyBookings/>
}

/>

<Route

path="/recommendations"

element={
<Recommendations/>
}

/>

<Route
path="/payment"
element={<Payment/>}
/>

<Route
path="/profile"
element={<Profile/>}
/>

<Route
path="/trainers/:id"
element={<TrainerProfile/>}
/>

</Routes>

</BrowserRouter>

);

}

export default App;