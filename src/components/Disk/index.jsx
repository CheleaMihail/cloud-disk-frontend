import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createDir, getFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setViewAction } from "../../reducers/fileReducer";
import Input from "../UI/Input";
import Loader from "../UI/Loader";
import PopUp from "../UI/PopUp";
import styles from "./Disk.module.scss";
import FilesList from "./FilesList";
import Uploader from "./Uploader";

const Disk = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.app.loader);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [name, setName] = useState("");
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const createDirHandler = () => {
    dispatch(createDir(currentDir, name));
    setIsPopUpVisible(false);
    setName("");
  };

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const closePopUp = () => {
    setIsPopUpVisible(false);
    setName("");
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className={styles.disk}
      onDragEnter={(e) => dragEnterHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragEnterHandler(e)}
    >
      <div className={styles.disk__controls}>
        <div className={styles.disk__navigation}>
          <button className={styles.disk__back} onClick={() => backClickHandler()}>
            Back
          </button>
          <button className={styles.disk__create} onClick={() => setIsPopUpVisible(true)}>
            Create
          </button>
          <div className={styles.upload}>
            <label className={styles.upload__label} htmlFor="upload-input">
              Upload file
            </label>
            <input
              multiple={true}
              onChange={(e) => fileUploadHandler(e)}
              value=""
              type="file"
              id="upload-input"
              className={styles.upload__input}
            />
          </div>
        </div>
        <div className={styles.disk__view}>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={styles.disk__select}>
            <option value="name">By name</option>
            <option value="type">By type</option>
            <option value="date">By date</option>
          </select>
          <button className={styles.disk__plate} onClick={() => dispatch(setViewAction("plate"))} />
          <button className={styles.disk__list} onClick={() => dispatch(setViewAction("list"))} />
        </div>
      </div>
      <FilesList />
      <PopUp
        isVisible={isPopUpVisible}
        setIsVisible={setIsPopUpVisible}
        parentStyle={styles.visibleModal}
        handleSubmit={createDirHandler}
        handleClose={closePopUp}
      >
        <Input type="text" placeholder="Enter name of file" value={name} setValue={setName} />
      </PopUp>
      <Uploader />
    </div>
  ) : (
    <div
      className={styles.dropArea}
      onDragEnter={(e) => dragEnterHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragEnterHandler(e)}
      onDrop={(e) => dropHandler(e)}
    >
      Drop files here
    </div>
  );
};

export default Disk;
