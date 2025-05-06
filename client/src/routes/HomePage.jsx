import React, { useEffect, useState } from "react";
import styles from "../Styles/HomePage.module.css";
import { Link, Links } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostLists from "../components/PostLists";

const headings = [
  "Discover, Engage, and Share",
  "Explore, Express, Empower",
  "Connect Through Words",
  "Where Ideas Take Flight",
];

const HomePage = () => {
  const [currentHeading, setCurrentHeading] = useState(headings[0]);
  const [fadeIn, setFadeIn] = useState(true);

  let headingIndex = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        headingIndex = (headingIndex + 1) % headings.length;
        setCurrentHeading(headings[headingIndex]);
        setFadeIn(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.homecontainer}>
      {/* BreadCrumb */}
      <div className={styles.hometop}>
        <Link to={"/"} className={styles.hometophome}>Home</Link>
        <span style={{ color: "#000" }}>&#x2022;</span>
        <span>Blog and Articles</span>
      </div>
      {/* Introduction */}
      <div className={styles.intro}>
        <div>
          <h1
            className={`${styles.heading} ${
              fadeIn ? styles.fadeIn : styles.fadeOut
            }`}
          >
            {currentHeading}
          </h1>
          <p>
            Refine your ideas, make your mark, and craft your perfect story.
          </p>
        </div>
        <Link to="write" className={styles.introbtn}>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className={styles.svg}
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className={styles.introbtnbtm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      {/* categories */}
      <MainCategories />

      {/* FeaturedPosts */}
      <FeaturedPosts />

      {/* Posts Lists */}
      <div style={{ margin: "5px 0" }}>
        <h1 style={{ fontWeight: "600", color: "grey" }}>Recent Posts</h1>
        <PostLists />
      </div>
    </div>
  );
};

export default HomePage;
