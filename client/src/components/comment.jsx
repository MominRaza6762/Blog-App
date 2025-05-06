import React from "react";
import styles from "../Styles/SinglePostPage.module.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dots } from "react-activity";


const Comment = ({ comment,postid }) => {
  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("authToken");


  const queryClient = useQueryClient();

  const delCommentMutation = useMutation({
    mutationFn: () => {
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries({ queryKey: ["comments",postid] });
    },
    onError: (error) => {
      if (!user) {
        return navigate("/login");
      }
      toast.error(error.data.message);
    },
  });

  const handleDeleteComment = () =>{
    delCommentMutation.mutate()
  }


  return (
    <div className={styles.commentcontainer}>
      <div className={styles.topinfo}>
        {comment?.user?.img && (
          <img
            src={comment?.user?.img}
            className={styles.commentimg}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundSize: "cover",
              border: "none",
              outline: "none",
            }}
          />
        )}
        <h3>{comment?.user?.username}</h3>
        <span>{format(comment?.createdAt)}</span>
        {((user && comment.user.username === user.username) ||
          user?.role === "admin") && (
          <span
            style={{
              cursor: "pointer",
              color: "red",
            }}
            onClick={handleDeleteComment}
          >
            Delete
            {delCommentMutation.isPending && <span style={{fontSize : '6px'}}><Dots /></span>}
          </span>
        )}
      </div>
      <p>{comment?.desc}</p>
    </div>
  );
};

export default Comment;
