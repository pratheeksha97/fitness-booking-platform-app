import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function Payment() {

  const location = useLocation();

  const navigate = useNavigate();

  const [loading, setLoading] =
  useState(false);

  const fitnessClass =
  location.state?.fitnessClass;

  if (!fitnessClass) {

    return <h2>Class Not Found</h2>;

  }

  const handlePayment =
  async () => {

    try {

      setLoading(true);

      /*
      Step 1
      Create Payment
      */

      const paymentRes =
      await API.post(

        "/payments/create-order",

        {
          classId:
          fitnessClass._id
        }

      );

      const paymentId =
      paymentRes.data.paymentId;

      /*
      Step 2
      Mock Success
      */

      await API.post(

        `/payments/success/${paymentId}`

      );

      alert(
        "Payment Successful.\nConfirmation Email Sent.\nInvoice Generated."
      );

      navigate(
        "/bookings"
      );

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "Payment Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3edf7"
      }}
    >

      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          width: "450px",
          textAlign: "center",
          boxShadow:
            "0 4px 20px rgba(0,0,0,.1)"
        }}
      >

        <h1>

          Payment

        </h1>

        <h2>

          {fitnessClass.title}

        </h2>

        <p>

          {fitnessClass.description}

        </p>

        <h3>

          ₹{fitnessClass.price}

        </h3>

        <button

          onClick={handlePayment}

          disabled={loading}

          style={{

            background:
            "linear-gradient(135deg,#5b2c83,#8e63d6)",

            color: "#fff",

            border: "none",

            padding:
            "14px 25px",

            borderRadius:
            "10px",

            cursor: "pointer",

            marginTop: "20px"

          }}

        >

          {

          loading

          ?

          "Processing..."

          :

          "Pay Now"

          }

        </button>

      </div>

    </div>

  );

}