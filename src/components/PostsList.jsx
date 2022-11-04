import { useSelector } from "react-redux";
import Title from "./common/title";
import loding from "../loding.gif";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../services/posts";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postStatus === "loading") {
    content = (
      <p>
        <img src={loding} className="loding" alt="Loading..." />
      </p>
    );
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="row" id="posts">
      <Title title="View Post" />
      {content}
    </div>
  );
};
export default PostsList;
