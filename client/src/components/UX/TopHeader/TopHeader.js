import React from "react";
import "./styles/TopHeader.css";

const TopHeader = (props) => {
  const topNamesHeader = props.names.map((name, id) => (
    <span key={id}>{name}</span>
  ));

  return (
    <p className={[props.styles, "TopHeader"].join(" ")}>{topNamesHeader}</p>
  );
};

export default TopHeader;
