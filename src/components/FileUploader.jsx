import React from "react";
import { appStorage } from "../firebase/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
const FileUploader = ({ fileUpload, setFitleUpload, pdfurl, setpdfurl }) => {
  const handleChange = (e) => {
    setFitleUpload(e.target.files[0]);
    console.log("file ready for upload");
  };

  const handlupload = () => {
    const storageRef = ref(appStorage, `PDFfiles/${fileUpload.name}`);
    uploadBytes(storageRef, fileUpload)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => setpdfurl(url));
  };

  return (
    <section>
      <input type="file" onChange={handleChange} />
      <button type="button" onClick={handlupload}>
        upload
      </button>
    </section>
  );
};

export default FileUploader;
