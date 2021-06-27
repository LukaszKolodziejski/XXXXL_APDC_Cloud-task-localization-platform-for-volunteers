import React, { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NoToken.module.css";
import gsap from "gsap";

const NoToken = (props) => {
  const wrapper = useRef(null);
  useEffect(() => {
    const tl = gsap;
    const auth = wrapper.current;
    tl.set(auth, { y: "-50", ease: "power1.inOut" });
    tl.to(auth, { duration: 1.3, ease: "power1.inOut", y: "0" });
  });

  return (
    <Fragment>
      <div ref={wrapper}>
        <Link to="/login" className={styles.Token}>
          {props.text}
        </Link>
      </div>
    </Fragment>
  );
};

export default NoToken;
