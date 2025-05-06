import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom'
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Navbar from '../components/Navbar/Navbar'
import styles from "./MainLayout.module.css"
import { setAuth } from "../redux/features/authSlice";
import axios from "axios";


const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      // Fetch user data with the token
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setAuth(res.data.data));
        })
        .catch(() => {
          Cookies.remove("authToken");
        });
    }
  }, [dispatch]);
  return (
    <div className={styles.layoutcontainer}>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default MainLayout
