import React from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

const Input = (props) => {
  const onChange = (e) => props.setValue(e.target.value);
  return (
    <input
      value={props.value}
      onChange={onChange}
      className={styles.input}
      type={props.type}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
    />
  );
};

export default Input;
