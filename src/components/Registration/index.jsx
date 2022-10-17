import { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../UI/Input";

import styles from "./Registration.module.scss";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.registration}>
      <div className={styles.container}>
        <div className={styles.registration__header}>Register</div>
        <div className={styles.registration__inputs}>
          {/* <Input type="text" placeholder="Enter surname" />
          <Input type="text" placeholder="Enter name" /> */}
          <Input
            value={email}
            setValue={setEmail}
            type="email"
            placeholder="Enter email"
            autoComplete="off"
          />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Enter password"
            autoComplete="new-password"
          />
        </div>
        <button
          className={styles.registration__btn}
          onClick={() => registration(email, password)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Registration;
