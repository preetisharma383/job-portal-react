import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from "../../axiosInstance"; // adjust path if needed

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong during logout.";
      toast.error(msg);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <h2 >Global Connect</h2>
        </div>

        <ul className={`menu ${show ? "show-menu" : ""}`}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {user?.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>

          {user?.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}

          <li>
            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        </ul>

        <div
          className="hamburger"
          onClick={() => setShow((prev) => !prev)}
          aria-label="Menu Toggle"
        >
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
