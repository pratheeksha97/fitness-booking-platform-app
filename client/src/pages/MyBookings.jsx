import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import "./MyBookings.css";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {

      const res = await API.get(
        "/bookings/my-bookings"
      );

      console.log("Bookings:", res.data);

      setBookings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {

    try {

      await API.delete(
        `/bookings/${id}`
      );

      alert("Booking Cancelled");

      loadBookings();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Cancel Failed"
      );

    }
  };

  const rescheduleBooking = async (id) => {

    if (!newDate) {

      alert(
        "Please select a new date"
      );

      return;
    }

    try {

      const res = await API.put(
        `/bookings/reschedule/${id}`,
        {
          newDate
        }
      );

      alert(res.data.message);

      setSelectedBooking(null);

      setNewDate("");

      loadBookings();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Reschedule Failed"
      );

    }
  };

  return (

    <Layout>

      <div className="booking-container">

        <h1>
          My Bookings
        </h1>

        {bookings.length === 0 ? (

          <div className="empty-booking">
            No Bookings Found
          </div>

        ) : (

          bookings.map((booking) => (

            <div
              key={booking._id}
              className="booking-card"
            >

              <h2>
                {booking.class?.title}
              </h2>

              <p>
                Price: ₹{booking.class?.price}
              </p>

              <p>

                Date:

                {" "}

                {booking.class?.date
                  ? new Date(
                      booking.class.date
                    ).toLocaleDateString()
                  : "N/A"}

              </p>

              {booking.rescheduledDate && (

                <p>

                  New Date:

                  {" "}

                  {new Date(
                    booking.rescheduledDate
                  ).toLocaleDateString()}

                </p>

              )}

              <p>
                Status:
                {" "}
                {booking.status}
              </p>

              <div className="booking-actions">

                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelBooking(
                      booking._id
                    )
                  }
                >
                  Cancel Booking
                </button>

                <button
                  className="reschedule-btn"
                  onClick={() =>
                    setSelectedBooking(
                      booking._id
                    )
                  }
                >
                  Reschedule
                </button>

              </div>

              {selectedBooking === booking._id && (

                <div className="reschedule-box">

                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) =>
                      setNewDate(
                        e.target.value
                      )
                    }
                  />

                  <button
                    className="save-btn"
                    onClick={() =>
                      rescheduleBooking(
                        booking._id
                      )
                    }
                  >
                    Save
                  </button>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </Layout>

  );
}