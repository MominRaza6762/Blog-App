import React, { useState } from "react";
import styles from "../Styles/AuthStyles.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);


  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (register) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        register
      );
    },
    onSuccess: (res) => {
      toast.success("User Register Successfully");
      navigate(`/login`);
    },
    onError : (res) =>{
      console.log(res.response.data);
      toast.error(res.response.data)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password")
    };
    mutation.mutate(data);
  };


  return (
    <div className={styles.authcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Andrew Joe"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="username">UserName : </label>
          <input
            type="text"
            name="username"
            placeholder="andrew123"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="password">Password : </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              style={{ position: "relative" }}
            />
            {password.length > 0 ? (
              showPassword ? (
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
              )
            ) : null}
          </div>
        </div>
        <button type="submit" className={styles.submitbtn}>Sign Up</button>
        <p className={styles.authredirect}>
          Already have an account? <Link to={"/login"}>Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
