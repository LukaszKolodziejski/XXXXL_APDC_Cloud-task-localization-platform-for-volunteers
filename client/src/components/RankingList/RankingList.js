import React from "react";
import styles from "./RankingList.module.css";
import RankingSingleUser from "./RankingSingleUser/RankingSingleUser";
import TopHeader from "../UX/TopHeader/TopHeader";
// import users from "./users.json";

const RankingList = (props) => {
  const sortUsers = props.users.sort((a, b) => (a.coins < b.coins && 1) || -1);

  const headerNames = [
    "# RANK",
    "PLAYER",
    "STATUS",
    "RECEIVED COINS",
    "COMPLETED ROUND",
  ];

  const listOfTasks = sortUsers.map((user, numer) => (
    <RankingSingleUser
      key={user.id}
      id={user.id}
      place={numer + 1}
      name={user.publicUserId}
      status={user.status}
      tasks={user.tasks}
      coins={user.coins}
    />
  ));

  return (
    <section className={styles.RankingList}>
      <TopHeader styles="Ranking" names={headerNames} />
      <div>{listOfTasks}</div>
    </section>
  );
};

export default RankingList;
