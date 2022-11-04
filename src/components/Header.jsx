import { Link } from "react-router-dom";
import logo from "../text_white_.png";

const Header = () => {
  return (
    <header className="Header">
      <nav className="navbar navbar-expand-lg ">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="Division5" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="post">Add New Post</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
