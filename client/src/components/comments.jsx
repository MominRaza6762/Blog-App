import React, {  useState } from "react";
import styles from "../Styles/SinglePostPage.module.css";
import Comment from "./comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Dots } from "react-activity";
import { useNavigate } from "react-router-dom";

const Comments = ({ postid }) => {
  const [desc, setDesc] = useState("");
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate()

  if (!postid) return "Loading...";

  const token = Cookies.get("authToken");
  const fetchcomments = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/comments/${postid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postid],
    queryFn: fetchcomments,
    enabled : !!postid && isAuthenticated,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postid}`,
        { desc },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postid] });
      setDesc("");
      toast.success("Comment has been added");
    },
    onError: (error) => {
      toast.error("Something went wrong ", error.response.data);
    },
  });

  // if (isPending) return <Dots />;
  if (error) return `Error getting posts... ${error.message}`;
  if (!data) return "No comments were Found...";

  const handleclick = async () => {
    mutation.mutate();
  };

  if (!isAuthenticated) {
      return (
        <div className={styles.commentscontainer}>
          <h1>Comments</h1>
          <p>Please <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/login")}>log in</span> to comment on this post.</p>
        </div>
      );
    }

  return (
    <div className={styles.commentscontainer}>
      <h1>Comments</h1>
      <div className={styles.commentsinput}>
        <input
          type="text"
          placeholder="Enter your comment..."
          className={styles.input}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleclick}>Submit</button>
      </div>
      {isPending ? (
        <Dots />
      ) : error ? (
        "Error loading comments!"
      ) : (
        <>
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${desc} In Progress...`,
                createdAt: new Date(),
                user: {
                  img: user?.img,
                  username: user.username,
                },
              }}
            />
          )}

          {data.map((comment) => (
            <Comment comment={comment} postid = {postid} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
