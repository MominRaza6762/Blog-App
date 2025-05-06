import React, { useState } from "react";
import styles from "../Styles/AuthStyles.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setAuth ,clearAuth} from "../redux/features/authSlice.js";

const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false);

  // redux auth value
  const auth = useSelector((state) => state.auth.isAuthenticated);

  // dispatch function to call the action defined in the redux store
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (login) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/users/login`, login);
    },
    onSuccess: (res) => {
      toast.success("Login Successfully");
      const userData = res.data.data;
      Cookies.set("authToken", userData.token, { expires: 7 });
      dispatch(setAuth(userData));
      navigate(`/`);
    },
    onError: (res) => {      
      toast.error(res.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    mutation.mutate(data);
  };

  return (
    <div className={styles.authcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label htmlFor="username">UserName : </label>
          <input type="text" name="username" placeholder="joe123" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="password">Password : </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              style={{ position: "relative" }}
            />
            {showPassword ? (
              <i
                className={styles.passicon}
                onClick={() => setshowPassword(!showPassword)}
              >
                <FiEyeOff />
              </i>
            ) : (
              <i
                className={styles.passicon}
                onClick={() => setshowPassword(!showPassword)}
              >
                <FiEye />
              </i>
            )}
          </div>
        </div>
        <button type="submit" className={styles.submitbtn}>
          Login
        </button>
        <p className={styles.authredirect}>
          Don't have an account? <Link to={"/register"}>Signup</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
