import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../services/firebase-config";
import { addNewPost } from "../services/posts";
import Title from "./common/title";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImagesChanged = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = ref(storage, `images/${image.name + v4()}`);
      promises.push(uploadTask);
      uploadBytes(uploadTask, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((urls) => {
          setUrls((prevState) => [...prevState, urls]);
        });
      });
    });

    Promise.all(promises)
      .then(() => console.log("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const canSave =
    [title, content, urls].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, urls })).unwrap();

        setTitle("");
        setContent("");
        setImages([]);
        setUrls([]);
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <div>
      <Title title="Add a New Post" />
      <form>
        <div className="form-group">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            className="form-control"
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postContent">Content:</label>
          <textarea
            className="form-control"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postImages">Images:</label>
          <input
            type="file"
            multiple
            onChange={onImagesChanged}
            className="form-control"
          />
          <button
            type="button"
            onClick={handleUpload}
            class="btn btn-secondary"
          >
            Upload
          </button>

          <br />
          {urls.map((url, i) => (
            <img
              key={i}
              style={{ width: "100px", margin: " 2px", padding: " 2px" }}
              src={url}
              alt="firebase image"
            />
          ))}
        </div>
        <div className="form-group">
          <button
            class="btn btn-primary"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddPostForm;
