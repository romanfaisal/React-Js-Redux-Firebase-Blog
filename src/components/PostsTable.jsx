import React, { Component } from "react";
import Favourite from "./common/favourite";
import WatchLater from "./common/watchLater";
import Table from "./common/table";
import Img from "./common/img";
import ArrayJoin from "./common/arrayJoin";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    {
      key: "genres",
      label: "Genre",
      content: (movie) => <ArrayJoin arrayValue={movie.genres} />,
    },
    { path: "runtime", label: "Run Time" },
    { path: "year", label: "Year" },
    { path: "director", label: "Director" },

    { path: "actors", label: "Actors" },
    { path: "plot", label: "Plot" },
    {
      key: "posterUrl",
      label: "Poster Url",
      content: (movie) => (
        <Img
          src={movie.posterUrl}
          noImages="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
          alt={movie.title}
          title={movie.title}
          classes="posterTable"
        />
      ),
    },
    {
      key: "favourite",
      label: "Favourite",
      content: (movie) => (
        <Favourite
          favourited={movie.favourited}
          onClick={() => this.props.onFavourite(movie)}
        />
      ),
    },
    {
      key: "watchLater",
      label: "Watch Later",
      content: (movie) => (
        <WatchLater
          favourited={movie.watchLatered}
          onClick={() => this.props.onWatchLater(movie)}
        />
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
