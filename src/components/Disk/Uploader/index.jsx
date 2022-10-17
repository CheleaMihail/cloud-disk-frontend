import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";
import UploadFile from "../UploadFile";

import styles from "./Uploader.module.scss";

const Uploader = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.upload.isVisible);
  const files = useSelector((state) => state.upload.files);

  return (
    isVisible && (
      <div className={styles.uploader}>
        <div className={styles.uploader__header}>
          <div className={styles.uploader__title}>Downloads</div>
          <button className={styles.uploader__close} onClick={() => dispatch(hideUploader())}>
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
