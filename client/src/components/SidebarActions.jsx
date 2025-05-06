import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import PostMenuActions from "./PostMenuActions";
import Image from "./Image";
import styles from "../Styles/SinglePostPage.module.css";
const SidebarActions = ({ data }) => {
  return (
    <div className={styles.spbtmright}>
      <h4>Author</h4>

      <div className={styles.spbtmrightdetails}>
        <div>
          {data?.user?.img && (
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewI4tonTOU-MiDbFkpGQ2MN_lMsLZCxSaBg&s"
              }
              alt="userimg"
              width={30}
              height={30}
              style={{ borderRadius: "50%", border: "none", outline: "none" }}
            />
          )}
          <span>{data?.user.username}</span>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      </div>
      <div className={styles.spbtmrightsocial}>
        <Link>
          <Image src={"facebook.svg" || null} />
        </Link>
        <Link>
          <Image src={"instagram.svg" || null} />
        </Link>
      </div>
      <PostMenuActions post={data} />
      {/* Categories */}
      <div className={styles.categoriescontainer}>
        <h3>Categories</h3>
        <Link className={styles.categoryitem}>All</Link>
        <Link className={styles.categoryitem} to="/">
          Web Design
        </Link>
        <Link className={styles.categoryitem} to="/">
          Development
        </Link>
        <Link className={styles.categoryitem} to="/">
          Databases
        </Link>
        <Link className={styles.categoryitem} to="/">
          Search Engines
        </Link>
        <Link className={styles.categoryitem} to="/">
          Marketing
        </Link>
      </div>
      {/* Search box */}
      <h3>Search</h3>
      <Search />
    </div>
  );
};

export default SidebarActions;
