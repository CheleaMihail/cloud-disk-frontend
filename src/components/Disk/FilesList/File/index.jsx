import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./File.module.scss";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import deleteImg from "../../../../assets/img/deleteIcon.svg";
import downloadImg from "../../../../assets/img/download.svg";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);
  const [showMenu, setShowMenu] = useState(false);
  const [showExpander, setShowExpander] = useState(false);

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      dispatch(setCurrentDir(file._id));
      dispatch(pushToStack(currentDir));
    }
  };

  const downloadClickHandler = (event) => {
    event.stopPropagation();
    downloadFile(file);
  };

  const deleteFileHandler = (event) => {
    event.stopPropagation();
    dispatch(deleteFile(file));
  };

  const handlerExpandMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
    setShowExpander(true);
  };

  if (fileView === "plate") {
    return (
      <div
        className={styles.file_plate}
        onClick={() => openDirHandler(file)}
        onMouseEnter={() => setShowExpander(true)}
        onMouseLeave={() => {
          setShowExpander(false);
          setShowMenu(false);
        }}
      >
        <img className={styles.file_plate__img} src={file.type === "dir" ? dirLogo : fileLogo} alt="file" />
        <div className={styles.file_plate__name}>{file.name}</div>
        <button
          className={classNames(styles.file_plate__expander, showExpander && styles.visible)}
          onClick={(e) => handlerExpandMenu(e)}
        />
        {showMenu && (
          <div className={styles.file_plate__contextMenu} onMouseLeave={() => setShowMenu(false)}>
            {file.type !== "dir" && (
              <button
                onClick={(e) => downloadClickHandler(e)}
                className={classNames(styles.file_plate__btn, styles.file_plate__download)}
              >
                <img src={downloadImg} alt="Download" />
                <span>Download</span>
              </button>
            )}
            <button
              onClick={(e) => deleteFileHandler(e)}
              className={classNames(styles.file_plate__btn, styles.file_plate__remove)}
            >
              <img src={deleteImg} alt="Delete" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (fileView === "list") {
    return (
      <div className={styles.file} onClick={() => openDirHandler(file)}>
        <img className={styles.file__img} src={file.type === "dir" ? dirLogo : fileLogo} alt="file" />
        <div className={styles.file__name}>{file.name}</div>
        <div className={styles.file__date}>{file.date.slice(0, 10)}</div>
        <div className={styles.file__size}>{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <button
            onClick={(e) => downloadClickHandler(e)}
            className={classNames(styles.file__btn, styles.file__download)}
          ></button>
        )}
        <button
          onClick={(e) => deleteFileHandler(e)}
          className={classNames(styles.file__btn, styles.file__remove)}
        ></button>
      </div>
    );
  }
};

export default File;
