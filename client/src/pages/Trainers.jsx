import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import TrainerCard from "../components/TrainerCard";
import API from "../api/axios";

import "./Trainers.css";

export default function Trainers() {

  const [trainers, setTrainers] =
  useState([]);

  const [loading, setLoading] =
  useState(true);

  useEffect(() => {

    loadTrainers();

  }, []);

  const loadTrainers =
  async () => {

    try {

      const res =
      await API.get(
        "/trainers"
      );

      console.log(
        "Trainer Data:",
        res.data
      );

      setTrainers(
        res.data
      );

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  const yoga =
  trainers.filter(

    item =>

    item.specializations?.includes(
      "Yoga"
    )

  );

  const cardio =
  trainers.filter(

    item =>

    item.specializations?.includes(
      "Cardio"
    )

  );

  const strength =
  trainers.filter(

    item =>

    item.specializations?.includes(
      "Strength Training"
    )

  );

  const zumba =
  trainers.filter(

    item =>

    item.specializations?.includes(
      "Zumba"
    )

  );

  if (loading) {

    return (

      <Layout>

        <h2
          style={{
            textAlign:"center",
            marginTop:"40px"
          }}
        >

          Loading Trainers...

        </h2>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="trainer-page">

        <h1>
          Fitness Trainers
        </h1>

        {/* Yoga */}

        <h2>
          🧘 Yoga Trainers
        </h2>

        <div className="trainer-grid">

          {
            yoga.map(item => (

              <TrainerCard
                key={item._id}
                trainer={item}
              />

            ))
          }

        </div>

        {/* Cardio */}

        <h2>
          🏃 Cardio Trainers
        </h2>

        <div className="trainer-grid">

          {
            cardio.map(item => (

              <TrainerCard
                key={item._id}
                trainer={item}
              />

            ))
          }

        </div>

        {/* Strength */}

        <h2>
          🏋️ Strength Training Trainers
        </h2>

        <div className="trainer-grid">

          {
            strength.map(item => (

              <TrainerCard
                key={item._id}
                trainer={item}
              />

            ))
          }

        </div>

        {/* Zumba */}

        <h2>
          💃 Zumba Trainers
        </h2>

        <div className="trainer-grid">

          {
            zumba.map(item => (

              <TrainerCard
                key={item._id}
                trainer={item}
              />

            ))
          }

        </div>

      </div>

    </Layout>

  );

}