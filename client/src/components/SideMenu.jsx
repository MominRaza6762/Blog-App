import React from "react";
import Search from "../components/Search";
import styles from "../Styles/PostList.module.css";
import { useSearchParams } from "react-router-dom";
const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const handleCategoryChange = (category) =>{
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  }

  return (
    <div className={styles.smcontainer}>
      <h1 className={styles.heading}>Search</h1>
      <Search />
      <h1 style={{ marginTop: "20px" }} className={styles.heading}>
        Filter
      </h1>
      <div className={styles.filters}>
        <label htmlFor="" className={styles.label}>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className={styles.input}
          />
          Newest
        </label>
        <label htmlFor="" className={styles.label}>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className={styles.input}
          />
          Most Popular
        </label>
        <label htmlFor="" className={styles.label}>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className={styles.input}
          />
          Trending
        </label>
        <label htmlFor="" className={styles.label}>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className={styles.input}
          />
          Oldest
        </label>
      </div>
      <h1 className={styles.heading}>Categories</h1>
      <div className={styles.category}>
        <span onClick={() => handleCategoryChange("general")}>All</span>
        <span onClick={() => handleCategoryChange("web-design")}>
          Web Design
        </span>
        <span onClick={() => handleCategoryChange("development")}>
          Development
        </span>
        <span onClick={() => handleCategoryChange("databases")}>Databases</span>
        <span onClick={() => handleCategoryChange("seo")}>Search Engines</span>
        <span onClick={() => handleCategoryChange("marketing")}>Marketing</span>
      </div>
    </div>
  );
};

export default SideMenu;
