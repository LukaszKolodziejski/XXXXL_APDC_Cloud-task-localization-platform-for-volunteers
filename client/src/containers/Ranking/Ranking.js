import React, { Component } from "react";
import styles from "./Ranking.module.css";
import RankingList from "../../components/RankingList/RankingList";
import Spinner from "../../components/UI/Spinner/Spinner";
import NoToken from "../../components/UX/NoToken/NoToken";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";

class Ranking extends Component {
  componentDidMount = () => this.props.onAuthCheckState();

  render() {
    let ranking;
    const { accounts, idToken, userId, loadingAccounts } = this.props;
    const noTokenText = "Authenticate to see full ranking.";

    if (loadingAccounts && idToken) {
      ranking = <Spinner />;
    } else if (loadingAccounts && !idToken) {
      ranking = <NoToken text={noTokenText} />;
    } else if (!loadingAccounts && !idToken) {
      ranking = <NoToken text={noTokenText} />;
    } else if (!loadingAccounts && idToken) {
      ranking = <RankingList users={accounts} />;
    }

    return <div className={styles.Ranking}>{ranking}</div>;
  }
}

const mapStateToProps = ({ account, auth }) => {
  const { accounts, loadingAccounts } = { ...account };
  const { idToken, userId, loading } = { ...auth };
  return { accounts, loading, idToken, userId, loadingAccounts };
};

const mapDispatchToProps = (dispatch) => ({
  onAuthCheckState: () => dispatch(actionCreators.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
