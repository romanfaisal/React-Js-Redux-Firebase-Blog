import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../services/firebase-config";
import { selectPostById, updatePost, deletePost } from "../services/posts";
import Title from "./common/title";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  //const post = useSelector((state) => selectPostById(state, Number(postId)))
  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [images, setImages] = useState(post.urls ? post.urls : []);
  const [urls, setUrls] = useState(post.urls ? post.urls : []);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

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
    [title, content, urls].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            urls,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setImages([]);
        setUrls([]);
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setImages([]);
      setUrls([]);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <Title title="Edit Post" />
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
            className="form-control"
            type="file"
            multiple
            onChange={onImagesChanged}
          />
          <button
            type="button"
            onClick={handleUpload}
            class="btn btn-secondary"
          >
            Upload
          </button>

          <br />
          {urls &&
            urls.map((url, i) => (
              <img
                key={i}
                style={{ width: "100px", margin: " 2px", padding: " 2px" }}
                src={url}
                alt="firebase-image"
              />
            ))}
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary ml-1 mr-1"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Update Post
          </button>
          <button
            className="btn btn-danger ml-1 mr-1"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
