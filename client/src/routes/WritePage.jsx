import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "../Styles/writepage.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import Upload from "../components/Navbar/Upload";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";


const WritePage = () => {
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`
      );
  }, [video]);

  const token = Cookies.get("authToken");

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/posts/`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      // console.log(res);
      toast.success("Post has been created");
      navigate(`/${res.data.data.slug}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };
    // console.log(data)

    mutation.mutate(data);
  };

  return (
    <div className={styles.writecontainer}>
      <h1 className={styles.heading}>Create a New Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Upload type={"image"} setProgress={setProgress} setData={setCover}>
          {cover ? (
            <img
            className={styles.uploadpreview}
              src={cover.url}
              style={{ width: "100px", height: "80px", backgroundSize: "cover",borderRadius : '10px' }}
            />
          ) : (
            <button type="button" className={styles.writebtn}>
              Add a cover image
            </button>
          )}
        </Upload>

        <input
          className={styles.input}
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className={styles.categorycontainer}>
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className={styles.textarea}
          name="desc"
          placeholder="A Short Description"
        />
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Upload type={"image"} setProgress={setProgress} setData={setImg}>
            🖼️
          </Upload>
          <Upload type={"video"} setProgress={setProgress} setData={setVideo}>
            📼
          </Upload>
          {/* <div style={{ cursor: "pointer" }}></div>
          <div style={{ cursor: "pointer" }}></div> */}
        </div>

        <ReactQuill
          theme="snow"
          className={styles.reactquill}
          value={value}
          onChange={setValue}
          readOnly={0 > progress && progress < 100}
        />
        <button
          type="submit"
          className={styles.submitbtn}
          disabled={mutation.isPending || (0 > progress && progress < 100)}
        >
          {mutation.isPending ? <Dots /> : "Send"}
        </button>
        {"Progress:" + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default WritePage;
