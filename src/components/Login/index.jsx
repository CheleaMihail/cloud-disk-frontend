import { useState } from "react";
import { useDispatch } from "react-redux";

import { autentification } from "../../actions/user";
import Input from "../UI/Input";

import styles from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.login__header}>Autentification</div>
        <div className={styles.login__inputs}>
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
          className={styles.login__btn}
          onClick={() => dispatch(autentification(email, password))}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
