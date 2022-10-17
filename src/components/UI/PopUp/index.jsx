import classNames from "classnames";

import styles from "./PopUp.module.scss";

const PopUp = ({
  isVisible,
  parentStyle,
  handleSubmit,
  handleClose,
  children,
}) => {
  return (
    <div
      className={classNames(styles.popUp, isVisible && parentStyle)}
      onClick={() => handleClose()}
    >
      <div
        className={styles.popUp__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.popUp__header}>
          <div className={styles.popUp__title}>Create new folder</div>
          <button
            className={styles.popUp__close}
            onClick={() => handleClose()}
          ></button>
        </div>
        {children}
        <button className={styles.popUp__create} onClick={() => handleSubmit()}>
          Create
        </button>
      </div>
    </div>
  );
};

export default PopUp;
