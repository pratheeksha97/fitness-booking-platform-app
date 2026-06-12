import Layout from "../components/Layout";

import yogaImg from "../assets/yoga.jpg";
import cardioImg from "../assets/cardio.jpg";
import strengthImg from "../assets/strength training.jpg";
import zumbaImg from "../assets/zumbaa.jpg";

import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const categories = [

    {
      title: "Yoga",
      image: yogaImg,
      description:
        "Improve flexibility, balance and mental wellness."
    },

    {
      title: "Cardio",
      image: cardioImg,
      description:
        "Boost endurance and burn calories effectively."
    },

    {
      title: "Strength Training",
      image: strengthImg,
      description:
        "Build muscle and improve overall strength."
    },

    {
      title: "Zumba",
      image: zumbaImg,
      description:
        "Fun dance workouts for fitness and weight loss."
    }

  ];

  return (

    <Layout>

      <div className="dashboard-container">

        <h3>
          Welcome To Fitness Booking Platform
        </h3>

        <p>
          Discover classes, trainers and personalized fitness recommendations.
        </p>

        {/* Quick Actions */}

        <div className="quick-actions">

          <button
            onClick={() => navigate("/classes")}
          >
            Browse Classes
          </button>

          <button
            onClick={() => navigate("/bookings")}
          >
            My Bookings
          </button>

          <button
            onClick={() => navigate("/trainers")}
          >
            Find Trainers
          </button>

          <button
            onClick={() => navigate("/recommendations")}
          >
            Recommendations
          </button>

        </div>

        {/* Fitness Categories */}

        <div className="category-grid">

          {
            categories.map((item, index) => (

              <div
                key={index}
                className="category-card"
                onClick={() => navigate("/classes")}
                style={{ cursor: "pointer" }}
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>

            ))
          }

        </div>

        {/* Extra Information Section */}

        <div className="dashboard-info">

          <div className="info-card">

            <h2>Why Choose Yoga?</h2>

            <p>
              Yoga helps improve flexibility, posture, breathing,
              stress management and overall wellbeing.
            </p>

          </div>

          <div className="info-card">

            <h2>Benefits of Cardio</h2>

            <p>
              Cardio workouts improve heart health,
              increase stamina and support weight loss.
            </p>

          </div>

          <div className="info-card">

            <h2>Strength Training</h2>

            <p>
              Build lean muscle, improve bone density
              and increase overall body strength.
            </p>

          </div>

          <div className="info-card">

            <h2>Zumba Fitness</h2>

            <p>
              Enjoy energetic dance-based workouts
              while burning calories and improving fitness.
            </p>

          </div>

        </div>

      </div>

    </Layout>

  );

}