import React from "react";

const ConvertTime = (props) => {
  const { expiryDate } = props;

  const convertDate = (date) => {
    const d = new Date(date);
    let newD = d.toString();
    newD = `${newD.slice(4, 10)}, ${newD.slice(16, 21)}h`;
    return newD;
  };

  return (
    <span className={{ color: "#494e61" }}>{convertDate(expiryDate)}</span>
  );
};

export default ConvertTime;
