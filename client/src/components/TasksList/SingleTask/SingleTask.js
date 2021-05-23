import React from "react";
import styles from "./styles/SingleTask.module.css";
import StatusSingleTask from "./StatusSingleTask/StatusSingleTask";
import ExpiryDateSingleTask from "./ExpiryDateSingleTask/ExpiryDateSingleTask";

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
      <StatusSingleTask status={status} />
      <ExpiryDateSingleTask expiryDate={expiryDate} />
      <span className={styles.Coin}>{coins}</span>
    </div>
  );
});

export default SingleTask;
