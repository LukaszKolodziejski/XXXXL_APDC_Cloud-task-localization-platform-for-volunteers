import React from "react";
import SingleAccount from "./SingleAccount/SingleAccount";
import ListAccountsHeader from "./ListAccountsHeader/ListAccountsHeader";
import styles from "./ListAccounts.module.css";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const ListAccounts = (props) => {
  const { accounts, userId } = props;

  const dispatch = useDispatch();

  const onChangeAccountsAttributes = (id, state, role) =>
    dispatch(
      actionCreators.changeAccountsAttributes(accounts, id, state, role)
    );

  const onDeleteAccount = (id) =>
    dispatch(actionCreators.deleteAccount(accounts, id));

  const myAccount = accounts.find((account) => account.userId === userId);

  const allAccount = accounts.map((account) => {
    const isMyAccount = myAccount.userId === account.userId;
    if (myAccount.role === "USER") {
      if (account.role === "USER" && account.kindOfProfile === "Public") {
        return (
          <SingleAccount
            key={account.userId}
            id={account.id}
            userId={account.userId}
            publicUserId={account.publicUserId}
            email={account.email}
            profile={account.kindOfProfile}
            state={account.state}
            role={account.role}
            myRole={"USER"}
            myAccount={isMyAccount}
            onDelete={onDeleteAccount}
            onChangeAttributes={onChangeAccountsAttributes}
          />
        );
      }
    } else if (myAccount.role === "GBO") {
      return (
        <SingleAccount
          key={account.userId}
          id={account.id}
          userId={account.userId}
          publicUserId={account.publicUserId}
          email={account.email}
          profile={account.kindOfProfile}
          state={account.state}
          role={account.role}
          myRole={"GBO"}
          myAccount={isMyAccount}
          onDelete={onDeleteAccount}
          onChangeAttributes={onChangeAccountsAttributes}
        />
      );
    } else if (myAccount.role === "GA") {
      return (
        <SingleAccount
          key={account.userId}
          id={account.id}
          userId={account.userId}
          publicUserId={account.publicUserId}
          email={account.email}
          profile={account.kindOfProfile}
          state={account.state}
          role={account.role}
          myRole={"GA"}
          myAccount={isMyAccount}
          onDelete={onDeleteAccount}
          onDelete={onDeleteAccount}
          onChangeAttributes={onChangeAccountsAttributes}
        />
      );
    } else if (myAccount.role === "SU") {
      return (
        <SingleAccount
          key={account.userId}
          id={account.id}
          userId={account.userId}
          publicUserId={account.publicUserId}
          email={account.email}
          profile={account.kindOfProfile}
          state={account.state}
          role={account.role}
          myRole={"SU"}
          myAccount={isMyAccount}
          onDelete={onDeleteAccount}
          onChangeAttributes={onChangeAccountsAttributes}
        />
      );
    }
  });
  return (
    <section className={styles.ListAccounts}>
      <ListAccountsHeader role={myAccount.role} />
      {allAccount}
    </section>
  );
};

export default ListAccounts;
