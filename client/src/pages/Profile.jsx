import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import "./Profile.css";

export default function Profile() {

  const [user, setUser] =
  useState(null);

  const [bookings, setBookings] =
  useState([]);

  const [recommendations,
  setRecommendations] =
  useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

      setUser(
        storedUser
      );

      const bookingRes =
      await API.get(
        "/bookings/my-bookings"
      );

      setBookings(
        bookingRes.data
      );

      const recRes =
      await API.get(
        "/recommendations"
      );

      setRecommendations(
        recRes.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!user) {

    return (

      <Layout>

        <h2>
          Loading Profile...
        </h2>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="profile-dashboard">

        {/* User Info */}

        <div className="profile-header-card">

          <h3>

            Welcome,
            {" "}
            {user.name}

          </h3>

          <p>

            Email:
            {" "}
            {user.email}

          </p>

          <p>

            Role:
            {" "}
            {user.role}

          </p>

        </div>

        {/* Weekly Progress */}

        <div className="stats-grid">

          <div className="stat-card">

            <h3>

              {bookings.length}

            </h3>

            <p>

              Total Bookings

            </p>

          </div>

          <div className="stat-card">

            <h3>

              {
              bookings.filter(
                item =>
                item.status ===
                "Confirmed"
              ).length
              }

            </h3>

            <p>

              Active Classes

            </p>

          </div>

          <div className="stat-card">

            <h3>

              {
              recommendations.length
              }

            </h3>

            <p>

              Recommendations

            </p>

          </div>

          <div className="stat-card">

            <h3>

              100%

            </h3>

            <p>

              Fitness Goal

            </p>

          </div>

        </div>

        {/* Today's Class */}

        <div className="section-card">

          <h2>

            Today's Class

          </h2>

          {

          bookings.length > 0 ?

          (

            <div className="class-item">

              <strong>

                {
                bookings[0]
                ?.class
                ?.title
                }

              </strong>

              <br />

              Date:

              {" "}

              {

              bookings[0]
              ?.class
              ?.date

              ?

              new Date(

              bookings[0]
              .class
              .date

              ).toLocaleDateString()

              :

              "N/A"

              }

            </div>

          )

          :

          (

            <p>

              No Upcoming Class

            </p>

          )

          }

        </div>

        {/* Upcoming Classes */}

        <div className="section-card">

          <h2>

            Upcoming Classes

          </h2>

          {

          bookings.length > 0 ?

          bookings
          .slice(0, 5)
          .map(item => (

            <div
              key={item._id}
              className="class-item"
            >

              <strong>

                {
                item.class?.title
                }

              </strong>

              <br />

              {

              item.class?.date

              ?

              new Date(

              item.class.date

              ).toLocaleDateString()

              :

              "N/A"

              }

            </div>

          ))

          :

          (

            <p>

              No Classes Found

            </p>

          )

          }

        </div>

        {/* Recommendations */}

        <div className="section-card">

          <h2>

            Recommended Classes

          </h2>

          {

          recommendations.length > 0 ?

          recommendations.map(item => (

            <span
              key={item._id}
              className="recommend-chip"
            >

              {item.title}

            </span>

          ))

          :

          (

            <p>

              No Recommendations

            </p>

          )

          }

        </div>

        {/* Achievements */}

        <div className="section-card">

          <h2>

            Achievements

          </h2>

          <div className="achievement-grid">

            <div className="achievement-card">

              🏆 First Booking

            </div>

            <div className="achievement-card">

              🔥 Active Member

            </div>

            <div className="achievement-card">

              💪 Fitness Enthusiast

            </div>

            <div className="achievement-card">

              ⭐ Goal Achiever

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}