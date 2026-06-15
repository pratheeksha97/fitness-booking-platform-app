import { useNavigate }
from "react-router-dom";


import {
useEffect,
useState
}
from "react";

import API
from "../api/axios";

import Layout
from "../components/Layout";

import "./Recommendations.css";
const navigate =
useNavigate();

export default function Recommendations(){

const [
recommendations,
setRecommendations
] = useState([]);

useEffect(()=>{

loadRecommendations();

},[]);

const loadRecommendations = async () => {

  try {

    const res =
    await API.get(
      "/recommendations"
    );

    console.log(
      "Recommendations Data:",
      res.data
    );

    setRecommendations(
      res.data
    );

  } catch(error){

    console.log(error);

  }

};

const bookClass = (fitnessClass) => {

  navigate(

    "/payment",

    {
      state: {
        fitnessClass
      }
    }

  );

};

return(

<Layout>

<div className="recommend-page">

<h1>

Recommended For You

</h1>

<p className="sub-title">

Personalized based on
your fitness goals

</p>

<div className="recommend-grid">

{

recommendations.length > 0 ?

recommendations.map(item=>(

<div
key={item._id}
className="recommend-card"
>

<div className="recommend-icon">

{

item.category === "Yoga"
? "🧘"

: item.category === "Cardio"
? "🏃"

: item.category ===
"Strength Training"
? "🏋️"

: "💃"

}

</div>

<h2>

{item.title}

</h2>

<p>

{item.description}

</p>

<div className="recommend-tags">

<span>

{item.category}

</span>

<span>

{item.duration} min

</span>

</div>

<p className="price">

₹{item.price}

</p>

<button

className="book-btn"

onClick={()=>
bookClass(
item
)
}

>

Book Now

</button>

</div>

))

:

(

<div className="empty-state">

No Recommendations Found

</div>

)

}

</div>

</div>

</Layout>

);

}