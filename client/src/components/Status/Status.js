import React from "react";
import PropTypes from "prop-types";
import Online from "./Online/Online";
import Progress from "./Progress/Progress";
import Offline from "./Offline/Offline";
import StatusDone from "./StatusDone/StatusDone";

const StatusSingleTask = React.memo((props) => {
  const { status } = props;
  const singleStatus =
    (status === "ONLINE" && <Online status={status} />) ||
    (status === "GETTING_COINS" && <Progress status={"GETTING COINS"} />) ||
    (status === "OFFLINE" && <Offline status={status} />) ||
    (status === "AVAILABLE" && <Online status={status} />) ||
    (status === "INPROGRESS" && <Progress status={"IN PROGRESS"} />) ||
    (status === "DONE" && <StatusDone status={"DONE / Not confirmed"} />);

  return singleStatus;
});

StatusSingleTask.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusSingleTask;
