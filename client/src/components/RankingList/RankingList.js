import React from "react";
import styles from "./RankingList.module.css";
import RankingSingleUser from "./RankingSingleUser/RankingSingleUser";
import TopHeader from "../UX/TopHeader/TopHeader";
import users from "./users.json";

const RankingList = (props) => {
  const addTask = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    console.log(date);
  };

  const sortUser = users.sort((a, b) => (a.coins < b.coins && 1) || -1);
  console.log(sortUser);

  const headerNames = [
    "# RANK",
    "PLAYER",
    "STATUS",
    "RECEIVED COINS",
    "COMPLETED ROUND",
  ];

  const listOfTasks = users.map((task, numer) => (
    <RankingSingleUser
      key={task.id}
      id={task.id}
      place={numer + 1}
      name={task.name}
      status={task.status}
      tasks={task.tasks}
      coins={task.coins}
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
