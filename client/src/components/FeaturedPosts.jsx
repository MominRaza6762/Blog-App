import React from "react";
import styles from "../Styles/FeaturedPosts.module.css";
import Image from "./Image";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchpost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchpost(),
  });

  if (isPending) return "Loading...";
  if (error) return `Error... ${error.message}`;
  if (!data) return "Post not Found...";

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className={styles.feature}>
      {/* feature Left side */}

      <div className={styles.featureleft}>
        {posts[0].img && (
          <Image
            src={posts[0].img || null}
            styles={{ backgroundSize: "cover", borderRadius: "20px" }}
            classname={styles.img}
          />
        )}
        <div className={styles.featureleftcontent}>
          <h1>01.</h1>
          <Link className={styles.featurecategory}>{posts[0].category}</Link>
          <span>{format(posts[0].createdAt)}</span>
        </div>
        <Link to={`${posts[0].slug}`} className={styles.featuretitle}>
          {posts[0].title}
        </Link>
        <br />
        <Link to={`${posts[0].slug}`} className={styles.featuredesc}>
          {posts[0].desc.length > 100
            ? posts[0].desc.slice(0, 100) + "..."
            : posts[0].desc}
        </Link>
      </div>

      {/* feature right side */}

      <div className={styles.featureright}>
        {/* Single Item */}
        <div className={styles.featurerightcontainer}>
          {posts[1].img && (
            <Image
              src={posts[1].img || null}
              styles={{ backgroundSize: "cover", borderRadius: "20px" }}
              classname={styles.featurerightimg}
            />
          )}
          <div>
            <div className={styles.featurerightcontent}>
              <h1>02.</h1>
              <Link className={styles.featurecategory}>
                {posts[1].category}
              </Link>
              <span>{format(posts[1].createdAt)}</span>
            </div>
            <Link to={`${posts[1].slug}`} className={styles.featuretitle}>
              {posts[1].title}
            </Link>
            <br />
            <Link to={`${posts[1].slug}`} className={styles.featuredesc}>
              {posts[1].desc.length > 50
                ? posts[1].desc.slice(0, 50) + "..."
                : posts[1].desc}
            </Link>
          </div>
        </div>
        {/* Single Item end */}

        {/* Single Item begin */}

        <div className={styles.featurerightcontainer}>
          {posts[2].img && (
            <Image
              src={posts[2].img || null}
              styles={{ backgroundSize: "cover", borderRadius: "20px" }}
              classname={styles.featurerightimg}
            />
          )}
          <div>
            <div className={styles.featurerightcontent}>
              <h1>03.</h1>
              <Link className={styles.featurecategory}>
                {posts[2].category}
              </Link>
              <span>{format(posts[2].createdAt)}</span>
            </div>
            <Link to={`${posts[2].slug}`} className={styles.featuretitle}>
              {posts[2].title}
            </Link>
            <br />
            <Link to={`${posts[2].slug}`} className={styles.featuredesc}>
              {posts[2].desc.length > 50
                ? posts[2].desc.slice(0, 50) + "..."
                : posts[2].desc}
            </Link>
          </div>
        </div>

        {/* Single Item end */}

        {/* Single Item begin */}
        <div className={styles.featurerightcontainer}>
          {posts[3].img && (
            <Image
              src={posts[3].img || null}
              styles={{ backgroundSize: "cover", borderRadius: "20px" }}
              classname={styles.featurerightimg}
            />
          )}
          <div>
            <div className={styles.featurerightcontent}>
              <h1>04.</h1>
              <Link className={styles.featurecategory}>
                {posts[3].category}
              </Link>
              <span>{format(posts[3].createdAt)}</span>
            </div>
            <Link to={`${posts[3].slug}`} className={styles.featuretitle}>
              {posts[3].title}
            </Link>
            <br />
            <Link to={`${posts[3].slug}`} className={styles.featuredesc}>
              {posts[3].desc.length > 50
                ? posts[3].desc.slice(0, 50) + "..."
                : posts[3].desc}
            </Link>
          </div>
        </div>

        {/* Single Item end */}
      </div>
    </div>
  );
};

export default FeaturedPosts;
