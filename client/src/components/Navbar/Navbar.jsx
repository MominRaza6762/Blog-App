import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "../Image";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {  clearAuth } from "../../redux/features/authSlice.js";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  // redux auth value
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    try {
      // Call logout endpoint
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/logout`
      );
      // Clear auth cookie
      Cookies.remove("authToken");
      dispatch(clearAuth());
      toast.success(res.data.message);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error during logout:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.navbarContainer}>
      {/* Logo */}
      <Link to="/" className={styles.logocontainer}>
        <span>Blog App</span>
      </Link>
      {/* MOBILE MENU */}
      <div className={styles.mobilemenu}>
        {/* icon container */}

        {/* Hamburger Menu */}
        <div
          className={styles.iconContainer}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className={`${styles.bar} ${styles.originLeft} ${
              open ? styles.rotate45 : ""
            }`}
          ></div>
          <div
            className={`${styles.bar} ${open ? styles.opacityZero : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${styles.originLeft} ${
              open ? styles.inverseRotate : ""
            }`}
          ></div>
        </div>
        {/* mobile menu */}
        <div
          className={`${styles.mobileLinkList} ${open ? styles.active : ""}`}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={styles.menuitem}
          >
            Home
          </Link>
          <Link
            to="/posts?sort=trending"
            onClick={() => setOpen(false)}
            className={styles.menuitem}
          >
            Trending
          </Link>
          <Link
            to="/posts?sort=popular"
            onClick={() => setOpen(false)}
            className={styles.menuitem}
          >
            Most Popular
          </Link>
          <Link
            to="/write"
            onClick={() => setOpen(false)}
            className={styles.menuitem}
          >
            Write
          </Link>
          {auth ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowDropDown(!showDropDown)}
                style={{
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
              >
                <img
                  src={
                    user?.img ||
                    "https://cdn-icons-png.flaticon.com/128/924/924915.png"
                  }
                  alt="user"
                  className={styles.navbaruser}
                />
              </button>
              {showDropDown && (
                <div
                className={styles.dropdown}
                style={{ position: "absolute", bottom: "30" }}
              >
                <button className={styles.btn} onClick={handleLogoutClick}>Logout</button>
                <Link className={`${styles.menuitem} ${styles.btn}`} to={"/profile"} >Profile</Link>
              </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className={styles.menuitem}
            >
              <button className={styles.loginbtn}>Login 👋</button>
            </Link>
          )}
        </div>
      </div>
      {/* desktop menu */}
      <div className={styles.desktopmenu}>
        <Link to="/" onClick={() => setOpen(false)} className={styles.menuitem}>
          Home
        </Link>
        <Link
          to="/posts?sort=trending"
          onClick={() => setOpen(false)}
          className={styles.menuitem}
        >
          Trending
        </Link>
        <Link
          to="/posts?sort=popular"
          onClick={() => setOpen(false)}
          className={styles.menuitem}
        >
          Most Popular
        </Link>
        <Link to="/write" onClick={() => setOpen(false)} className={styles.menuitem}>
          Write
        </Link>
        {auth ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropDown(!showDropDown)}
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              <img
                src={
                  user?.img ||
                  "https://cdn-icons-png.flaticon.com/128/924/924915.png"
                }
                alt="user"
                className={styles.navbaruser}
              />
            </button>
            {showDropDown && (
              <div
                className={styles.dropdown}
                style={{ position: "absolute", bottom: "30" }}
              >
                <button className={styles.btn} onClick={handleLogoutClick}>Logout</button>
                <Link className={`${styles.menuitem} ${styles.btn}`} to={"/profile"} >Profile</Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className={styles.menuitem}
          >
            <button className={styles.loginbtn}>Login 👋</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
