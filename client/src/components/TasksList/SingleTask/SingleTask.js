import React from "react";
import styles from "./styles/SingleTask.module.css";
import Status from "../../Status/Status";
import ConvertTime from "../../Convert/ConvertTime";

const SingleTask = React.memo((props) => {
  const { id, name, status, expiryDate, coins } = props;
  let borderStyleStatus;
  if (status === "AVAILABLE") borderStyleStatus = styles.Green;
  if (status === "INPROGRESS") borderStyleStatus = styles.Blue;
  if (status === "DONE") borderStyleStatus = styles.Red;
  const style = [styles.SingleTask, borderStyleStatus].join(" ");
  return (
    <div className={style}>
      <span>{name}</span>
      <Status status={status} />
      <ConvertTime expiryDate={expiryDate} />
      <span className={styles.Coin}>{coins}</span>
    </div>
  );
});

export default SingleTask;
