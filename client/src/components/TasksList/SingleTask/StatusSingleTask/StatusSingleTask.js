import React from "react";
import PropTypes from "prop-types";
import StatusAvailable from "./Status/StatusAvailable/StatusAvailable";
import StatusDone from "./Status/StatusDone/StatusDone";
import StatusProgress from "./Status/StatusProgress/StatusProgress";

const StatusSingleTask = React.memo((props) => {
  const { status } = props;
  const singleStatus =
    (status === "AVAILABLE" && <StatusAvailable status={status} />) ||
    (status === "INPROGRESS" && <StatusProgress status={status} />) ||
    (status === "DONE" && <StatusDone status={status} />);

  return singleStatus;
});

StatusSingleTask.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusSingleTask;
