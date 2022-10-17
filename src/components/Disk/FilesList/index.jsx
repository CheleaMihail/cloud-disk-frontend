import React from "react";
import { useSelector } from "react-redux";
import File from "./File";

import styles from "./FilesList.module.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const FilesList = () => {
  const files = useSelector((state) => state.files.files);
  const view = useSelector((state) => state.files.view);

  if (files.length === 0) {
    return (
      <div className={styles.empty}>
        <span>Directory is empty</span>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className={styles.filesList}>
        <div className={styles.filesList__header}>
          <div className={styles.filesList__name}>Name</div>
          <div className={styles.filesList__date}>Date</div>
          <div className={styles.filesList__size}>Size</div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={{ enterActive: styles.file_enter_active }}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }

  if (view === "plate") {
    return (
      <div className={styles.filesPlate}>
        {files.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }
};

export default FilesList;
