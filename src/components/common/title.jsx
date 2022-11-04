import React from "react";
const Title = ({ title }) => {
  return (
    <div className="card mb-3 col-12">
      <div className="card-body">
        <h2>{title}</h2>
      </div>
    </div>
  );
};
export default Title;
