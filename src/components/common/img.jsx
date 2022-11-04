import React from "react";

const Img = ({ src, classes, alt, title, noImages }) => {
  if (!src || src == null) src = noImages;
  return <img src={src} className={classes} alt={alt} title={title} />;
};
export default Img;
