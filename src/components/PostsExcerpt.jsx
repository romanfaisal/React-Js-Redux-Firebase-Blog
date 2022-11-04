import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
  return (
    <div className="col-lg-3  col-sm-6 col-12">
      <div className="post-contant">
        <h2 className="post-title">
          <Link to={`post/${post.id}`}>{post.title}</Link>
        </h2>

        <div className="post-img">
          {post.urls ? (
            <img src={post.urls[0]} alt={post.title} />
          ) : (
            <img
              src="https://via.placeholder.com/800x800?text=No+Images"
              alt={post.title}
            />
          )}
        </div>

        <div className="excerpt">
          {post.body.substring(0, 75)}
          <Link to={`post/${post.id}`}>...</Link>
        </div>
        <div className="post-credit">
          <Link to={`/post/edit/${post.id}`}>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Link>
          <TimeAgo timestamp={post.date} />
        </div>
      </div>
    </div>
  );
};
export default PostsExcerpt;
