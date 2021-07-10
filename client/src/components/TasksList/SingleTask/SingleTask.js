import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles/SingleTask.module.css";
import Status from "../../Status/Status";
import ConvertTime from "../../Convert/ConvertTime";

const SingleTask = React.memo((props) => {
  const { id, name, status, expiryDate, coins, creatorId } = props;
  const { onActiveDataList, onTasksHandler } = props;
  let borderStyleStatus;
  if (status === "AVAILABLE") borderStyleStatus = styles.Green;
  if (status === "INPROGRESS") borderStyleStatus = styles.Blue;
  if (status === "DONE") borderStyleStatus = styles.Red;
  const style = [styles.SingleTask, borderStyleStatus].join(" ");
  const { userId } = useSelector((state) => state.auth);
  const styleUser = creatorId === userId ? styles.MyAccount : null;
  const [isClicked, setIsClicked] = useState(false);

  const showTask = () => {
    onTasksHandler(id);
    setIsClicked(true);
  };

  if (isClicked) return <Redirect to="/current-tasks" />;
  return (
    <div
      className={style}
      onMouseEnter={() => onActiveDataList(id)}
      onMouseLeave={() => onActiveDataList(0)}
      onClick={showTask}
    >
      <span className={styleUser}>{name}</span>
      <Status status={status} />
      <ConvertTime expiryDate={expiryDate} />
      <span className={styles.Coin}>{coins}</span>
    </div>
  );
});

export default SingleTask;
