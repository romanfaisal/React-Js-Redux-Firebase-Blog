import { useSelector } from "react-redux";
import { selectPostById } from "../services/posts";
import TimeAgo from "./TimeAgo";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Title from "./common/title";
import { Carousel } from "react-bootstrap";
import Img from "./common/img";

const SinglePostPage = () => {
  const { postId } = useParams();

  //const post = useSelector((state) => selectPostById(state, Number(postId)));
  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <Title title={post.title} />
      {post.urls && (
        <div className="carousel-img">
          <Carousel>
            {post.urls.map((url, i) => (
              <Carousel.Item>
                <Img
                  src={url}
                  noImages="https://via.placeholder.com/800x800?text=No+Images"
                  alt={post.title}
                  title={post.title}
                  classes="d-block w-100"
                />
                <Carousel.Caption>
                  <h3>{post.title}</h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      <div>{post.body}</div>
      <div className="post-credit">
        <Link to={`/post/edit/${post.id}`}>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Link>
        <TimeAgo timestamp={post.date} />
      </div>
    </article>
  );
};

export default SinglePostPage;
