import React from "react";
import styles from "../Styles/PostLists.module.css";
import Image from "./Image";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const PostListsItem = ({ post }) => {
  return (
    <div className={styles.postlistitemcontainer}>
      {/* Image */}
      {post?.img && (
        <div className={styles.postlistimgcontainer}>
          <Image
            src={post?.img || null}
            classname={styles.postlistitemimg}
            w={"468"}
          />
        </div>
      )}
      <div className={styles.listdetails}>
        <Link to={post.slug} className={styles.title}>
          {post?.title}
        </Link>
        <div className={styles.itemdetails}>
          <span>Written By</span>
          <Link
            to={`/posts?author=${post?.user?.username}`}
            className={styles.itemlink}
          >
            {post?.user?.username}
          </Link>
          <span>on</span>
          <Link to={`/posts?cat=${post?.category}`} className={styles.itemlink}>{post?.category}</Link>
          <span>{format(post?.createdAt)}</span>
        </div>
        <p className={styles.desc}>
          {/* {post?.desc} */}
          {post.desc.length > 100 ? post.desc.slice(0, 100) + "..." : post.desc}
        </p>
        <Link to={`${post?.slug}`} className={styles.readmore}>
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostListsItem;
