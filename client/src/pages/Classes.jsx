import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import "./Classes.css";
import {
useNavigate
}
from "react-router-dom";


export default function Classes() {

  const [classes, setClasses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigate =useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [slotFilter, setSlotFilter] = useState("");

  useEffect(() => {

    loadClasses();
    loadRecommendations();

  }, []);

  const loadClasses = async () => {

    try {

      const res =
      await API.get("/classes");

      setClasses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadRecommendations =
  async () => {

    try {

      const res =
      await API.get(
        "/recommendations"
      );

      setRecommendations(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const bookClass =
  async (classId) => {

    try {

      await API.post(
        "/bookings",
        {
          classId
        }
      );

      alert(
        "Class Booked Successfully"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );

    }

  };

  const filteredClasses =
  classes.filter(item => {

    const searchMatch =
    item.title
    .toLowerCase()
    .includes(
      search.toLowerCase()
    );

    const typeMatch =

      typeFilter === "" ||

      item.category ===
      typeFilter;

    const durationMatch =

      durationFilter === "" ||

      item.duration ===
      Number(durationFilter);

    let slotMatch = true;

    if(slotFilter === "Morning"){

      slotMatch =
      item.startTime?.includes("AM");

    }

    if(slotFilter === "Evening"){

      slotMatch =
      item.startTime?.includes("PM");

    }

    return (

      searchMatch &&
      typeMatch &&
      durationMatch &&
      slotMatch

    );

  });

  const uniqueRecommendations = [
  ...new Map(
    recommendations.map(item => [
      item.title,
      item
    ])
  ).values()
];

  return (

    <Layout>

      <div className="classes-page">

        <h1 className="page-title">
          Classes
        </h1>

        {/* Search + Filters */}

        <div className="top-filters">

          <input
            type="text"
            placeholder="Search Classes"
            className="search-box"
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={typeFilter}
            onChange={(e)=>
              setTypeFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Types
            </option>

            <option value="Yoga">
              Yoga
            </option>

            <option value="Cardio">
              Cardio
            </option>

            <option value="Strength Training">
              Strength Training
            </option>

            <option value="Zumba">
              Zumba
            </option>

          </select>

          <select
            value={durationFilter}
            onChange={(e)=>
              setDurationFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Duration
            </option>

            <option value="30">
              30 Minutes
            </option>

            <option value="45">
              45 Minutes
            </option>

            <option value="60">
              60 Minutes
            </option>

            <option value="90">
              90 Minutes
            </option>

          </select>

          <select
            value={slotFilter}
            onChange={(e)=>
              setSlotFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Slots
            </option>

            <option value="Morning">
              Morning
            </option>

            <option value="Evening">
              Evening
            </option>

          </select>

        </div>

        {/* Recommendations */}

        <h2 className="section-title">
          Recommended Classes
        </h2>

        <div className="recommendation-row">

  {

  uniqueRecommendations.length > 0 ?

  uniqueRecommendations.map(item => (

    <div
      key={item._id}
      className="recommend-chip"
    >

      {item.title}

    </div>

  ))

  :

  <>

    <div className="recommend-chip">
      Morning Yoga
    </div>

    <div className="recommend-chip">
      Beginner Zumba
    </div>

    <div className="recommend-chip">
      Cardio Burn
    </div>

  </>

  }

</div>

        {/* Classes */}

        <h2 className="section-title">
          Available Classes
        </h2>

        <div className="classes-grid">

          {

          filteredClasses.map(item => (

            <div
              key={item._id}
              className="class-card"
            >

              <div className="class-icon">

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

              <h3>

                {item.title}

              </h3>

              <p>

                {item.description}

              </p>

              <div className="class-tags">

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

              <p>

                Seats Available:
                {" "}
                {item.availableSeats}

              </p>

              <button

className="book-btn"

onClick={()=>

navigate(

"/payment",

{

state:{
fitnessClass:item
}

}

)

}

>

Book Now

</button>

            </div>

          ))

          }

        </div>

      </div>

    </Layout>

  );

}