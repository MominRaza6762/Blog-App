import React from "react";
import styles from "../Styles/SinglePostPage.module.css";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import Comments from "../components/comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import parse from "html-react-parser";
import SidebarActions from "../components/SidebarActions";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";

const SinglePostPage = () => {
  const fetchpost = async (slug) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/posts/${slug}`
    );
    return res.data;
  };

  const { slug } = useParams();

  if (!slug) return "Loading...";

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchpost(slug),
  });

  if (isPending)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          overflow :'hidden'
        }}
      >
        <Dots />
      </div>
    );
  if (error) return `Error... ${error.message}`;
  if (!data) return "Post not Found...";

  return (
    <div className={styles.spcontainer}>
      {data.visit ? (
        <div className={styles.visit}>
          <p>Visits</p>
          <p> {data?.visit}</p>
        </div>
      ) : null}
      {/* single post top */}
      <div className={styles.sptop}>
        <div className={styles.sptopleft}>
          <h1 className={styles.sptoplefttitle}>{data?.title}</h1>
          <div className={styles.spdetails}>
            <span className={styles.spdetailsitem}>Written By</span>
            <Link className={styles.spdetailslink}>{data?.user.username}</Link>
            <span className={styles.spdetailsitem}>on</span>
            <Link className={styles.spdetailslink}>{data?.category}</Link>
            <span className={styles.spdetailsitem}>
              {format(data?.createdAt)}
            </span>
          </div>
          <p className={styles.sptopleftdecs}>{data?.desc}</p>
        </div>
        {data?.img && (
          <div className={styles.sptopright}>
            <Image src={data?.img || null} classname={styles.sptoprightimg} />
          </div>
        )}
      </div>
      {/* single post btm */}
      <div className={styles.spbtm}>
        <div className={styles.spbtmleft}>
          <div>{parse(data.content)}</div>
        </div>
        <SidebarActions data={data} />
      </div>
      {/* comments section */}
      <Comments postid={data._id} />
    </div>
  );
};

export default SinglePostPage;
