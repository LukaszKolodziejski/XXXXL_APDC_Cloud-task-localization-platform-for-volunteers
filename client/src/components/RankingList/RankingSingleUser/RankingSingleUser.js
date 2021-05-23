import React from "react";
import styles from "./styles/RankingSingleUser.module.css";
import Status from "../../Status/Status";

const RankingSingleUser = React.memo((props) => {
  const { id, place, name, status, tasks, coins } = props;
  let borderStyleStatus;
  if (status === "ONLINE") borderStyleStatus = styles.Green;
  if (status === "GETTING_COINS") borderStyleStatus = styles.Blue;
  if (status === "OFFLINE") borderStyleStatus = styles.Red;
  let bestUsers;
  if (place === 1) bestUsers = styles.Gold;
  if (place === 2) bestUsers = styles.Silver;
  if (place === 3) bestUsers = styles.Bronze;

  const style = [styles.RankingSingleUser, borderStyleStatus, bestUsers].join(
    " "
  );
  return (
    <div className={style}>
      <span className={styles.Place}>{place}</span>
      <span>{name}</span>
      <Status status={status} />
      <span className={styles.Coin}>{coins}</span>
      <span className={styles.Coin}>{tasks}</span>
    </div>
  );
});

export default RankingSingleUser;
