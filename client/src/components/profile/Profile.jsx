import React from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { clearAuth } from "../../redux/features/authSlice.js";
import { toast } from "react-toastify";

const Profile = () => {
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
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.imageContainer}>
          <img
            src={user?.img || "https://via.placeholder.com/150"}
            alt={`${user?.username}'s profile`}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.profileDetails}>
          <h2 className={styles.username}>{user?.username || "Guest"}</h2>
          <p className={styles.role}>Role: {user?.role || "User"}</p>
          <p className={styles.savedPosts}>
            Saved Posts: {user?.savedPosts?.length || 0}
          </p>
          <p className={styles.date}>
            Member since: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button className={styles.btn} onClick={handleLogoutClick}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
