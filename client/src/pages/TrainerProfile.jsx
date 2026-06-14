import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import API from "../api/axios";
import Layout from "../components/Layout";

import "./TrainerProfile.css";

export default function TrainerProfile() {

  const { id } = useParams();

  const [trainer, setTrainer] =
  useState(null);

  const [availability,
  setAvailability] =
  useState([]);

  const [reviews,
  setReviews] =
  useState([]);

  const [analytics,
  setAnalytics] =
  useState(null);

  const [rating,
  setRating] =
  useState(5);

  const [comment,
  setComment] =
  useState("");

  useEffect(() => {

    loadTrainer();

  }, [id]);

  const loadTrainer = async () => {

    try {

      const trainerRes =
      await API.get(
        `/trainers/${id}`
      );

      setTrainer(
        trainerRes.data
      );

      try {

        const availabilityRes =
        await API.get(
          `/availability/${id}`
        );

        setAvailability(
          availabilityRes.data
        );

      } catch (error) {

        console.log(
          "Availability Error",
          error
        );

      }

      try {

        const reviewRes =
        await API.get(
          `/reviews/${id}`
        );

        setReviews(
          reviewRes.data
        );

      } catch (error) {

        console.log(
          "Review Error",
          error
        );

      }

      try {

        const analyticsRes =
        await API.get(
          `/reviews/analytics/${id}`
        );

        setAnalytics(
          analyticsRes.data
        );

      } catch (error) {

        console.log(
          "Analytics Error",
          error
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  const submitReview =
  async () => {

    try {

      await API.post(

        "/reviews",

        {

          trainerId:id,

          rating:Number(
            rating
          ),

          comment

        }

      );

      alert(
        "Review Submitted Successfully"
      );

      setRating(5);

      setComment("");

      loadTrainer();

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "Failed to submit review"

      );

    }

  };

  if (!trainer) {

    return (

      <Layout>

        <h1>
          Loading Trainer...
        </h1>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="profile-container">

        {/* Header */}

        <div className="profile-header">

          <img
  src={trainer.photo}
  alt={trainer.trainerName}
  className="profile-photo"
  onError={(e) => {
    console.log("Image failed:", trainer.photo);
  }}
/>

          <div className="profile-info">

            <h1>

              {trainer.trainerName}

            </h1>

            <div className="rating">

              ⭐ {trainer.rating || 0}

            </div>

            <p>

              <strong>
                Bio:
              </strong>

              {" "}

              {trainer.bio}

            </p>

            <p>

              <strong>
                Experience:
              </strong>

              {" "}

              {trainer.experience}
              {" "}
              Years

            </p>

            <p>

              <strong>
                Specializations:
              </strong>

              {" "}

              {

              trainer.specializations?.join(", ")

              }

            </p>

            <p>

              <strong>
                Qualifications:
              </strong>

              {" "}

              {

              trainer.qualifications?.join(", ")

              }

            </p>

          </div>

        </div>

        {/* About */}

        <div className="section-card">

          <h2>

            About Trainer

          </h2>

          <p>

            {trainer.introMessage}

          </p>

        </div>

        {/* Video */}

        <div className="section-card">

          <h2>

            Introduction Video

          </h2>

          {

          trainer.introVideo && (

            <video
  controls
  width="100%"
  className="trainer-video"
>
  <source
    src={trainer.introVideo}
    type="video/mp4"
  />
</video>

          )

          }

        </div>

        {/* Availability */}

        <div className="section-card">

          <h2>

            Availability Slots

          </h2>

          <div className="slot-grid">

            {

            availability.length > 0 ?

            availability.map(slot => (

              <div
                key={slot._id}
                className="slot-card"
              >

                <h4>

                  {slot.day}

                </h4>

                <p>

                  {slot.startTime}

                  {" - "}

                  {slot.endTime}

                </p>

              </div>

            ))

            :

            <div
              className="slot-card"
            >

              No Slots Available

            </div>

            }

          </div>

        </div>

        {/* Reviews */}

        <div className="section-card">

          <h2>

            Reviews

          </h2>

          {

          reviews.length > 0 ?

          reviews.map(review => (

            <div
              key={review._id}
              className="review-card"
            >

              <h3>

                ⭐ {review.rating}

              </h3>

              <p>

                {review.comment}

              </p>

              <strong>

                -

                {" "}

                {

                review.user?.name ||

                "Member"

                }

              </strong>

              {

              review.trainerResponse && (

                <div
                  className="trainer-reply"
                >

                  <strong>

                    Trainer Reply:

                  </strong>

                  {" "}

                  {review.trainerResponse}

                </div>

              )

              }

            </div>

          ))

          :

          <div
            className="review-card"
          >

            No Reviews Yet

          </div>

          }

        </div>

        {/* Add Review */}

        <div className="section-card">

          <h2>

            Add Review

          </h2>

          <select

            value={rating}

            onChange={(e)=>

              setRating(
                e.target.value
              )

            }

          >

            <option value="5">
              ⭐⭐⭐⭐⭐
            </option>

            <option value="4">
              ⭐⭐⭐⭐
            </option>

            <option value="3">
              ⭐⭐⭐
            </option>

            <option value="2">
              ⭐⭐
            </option>

            <option value="1">
              ⭐
            </option>

          </select>

          <textarea

            placeholder="Write your review"

            value={comment}

            onChange={(e)=>

              setComment(
                e.target.value
              )

            }

          />

          <button

            className="book-btn"

            onClick={
              submitReview
            }

          >

            Submit Review

          </button>

        </div>

        {/* Analytics */}

        <div className="section-card">

          <h2>

            Feedback Analytics

          </h2>

          <div className="analytics-grid">

            <div className="analytics-card">

              <h3>

                {
                analytics?.averageRating || 0
                }

              </h3>

              <p>
                Average Rating
              </p>

            </div>

            <div className="analytics-card">

              <h3>

                {
                analytics?.totalReviews || 0
                }

              </h3>

              <p>
                Total Reviews
              </p>

            </div>

            <div className="analytics-card">

              <h3>

                {
                analytics?.fiveStar || 0
                }

              </h3>

              <p>
                5 Star Reviews
              </p>

            </div>

            <div className="analytics-card">

              <h3>

                {
                analytics?.fourStar || 0
                }

              </h3>

              <p>
                4 Star Reviews
              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}