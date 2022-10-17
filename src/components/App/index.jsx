import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./App.module.scss";
import NavBar from "../NavBar";
import Registration from "../Registration";
import Login from "../Login";
import { auth } from "../../actions/user";
import Disk from "../Disk";
import Profile from "../Profile";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <NavBar />
        <div className={styles.wrap}>
          {!isAuth ? (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route exact path="/" element={<Disk />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
