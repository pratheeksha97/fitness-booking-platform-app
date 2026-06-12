import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaDumbbell,
  FaCalendarCheck,
  FaStar,
  FaUserTie,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar() {

  const location = useLocation();

  const menu = [

    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard"
    },

    {
      name: "Classes",
      icon: <FaDumbbell />,
      path: "/classes"
    },

    {
      name: "Bookings",
      icon: <FaCalendarCheck />,
      path: "/bookings"
    },

    {
      name: "Recommendations",
      icon: <FaStar />,
      path: "/recommendations"
    },

    {
      name: "Trainers",
      icon: <FaUserTie />,
      path: "/trainers"
    },

    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile"
    }

  ];

  const navigate = useNavigate();

const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  alert(
    "Logged Out Successfully"
  );

  navigate("/");

};

  return (

    <div className="sidebar">

      <div className="logo">

        FITNESS BOOKING PLATFORM 

      </div>

      {

        menu.map((item) => (

          <Link

            key={item.path}

            to={item.path}

            className={
              location.pathname === item.path
                ? "menu active"
                : "menu"
            }

          >

            {item.icon}

            <span>

              {item.name}

            </span>

          </Link>

        ))

      }

      <div
className="logout"
onClick={logout}
style={{
cursor:"pointer"
}}
>
Logout
</div>

    </div>

  );

}