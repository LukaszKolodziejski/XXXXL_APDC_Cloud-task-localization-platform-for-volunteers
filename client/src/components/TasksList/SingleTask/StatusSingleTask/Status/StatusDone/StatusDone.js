import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

import styles from "./StatusDone.module.css";

const StatusDone = React.memo((props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.StatusDone}>DONE / Not confirmed</div>
    </div>
  );
});

StatusDone.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusDone;
