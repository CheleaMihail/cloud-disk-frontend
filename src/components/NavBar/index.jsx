import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { logout } from "../../reducers/userReducer";
import { searchFiles, getFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import { API_URL } from "../../config";
import Logo from "../../assets/img/disk.png";
import avatarIcon from "../../assets/img/avatarIcon.svg";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  // const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarIcon;

  const searchChangeHandler = (e) => {
    setSearchName(e.target.value);
    if (searchTimeout != false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value != "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbar__leftBlock}>
          <img src={Logo} alt="logo" className={styles.navbar__logo} />
          <div className={styles.navbar__header}>MERN Cloud</div>
          {isAuth && (
            <input
              className={styles.navbar__search}
              type="text"
              placeholder="Search..."
              value={searchName}
              onChange={(e) => searchChangeHandler(e)}
            />
          )}
        </div>
        <div className={styles.navbar__authButtons}>
          {!isAuth && (
            <div className={styles.navbar__login}>
              <Link to={"/login"}>Log in</Link>
            </div>
          )}
          {!isAuth && (
            <div className={styles.navbar__registration}>
              <Link to={"/registration"}>Register</Link>
            </div>
          )}
          {isAuth && (
            <div className={styles.navbar__exit} onClick={() => dispatch(logout())}>
              Exit
            </div>
          )}
          {isAuth && (
            <Link to={"/profile"}>
              <img className={styles.navbar__avatar} src={avatarIcon} alt={"Avatar"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
