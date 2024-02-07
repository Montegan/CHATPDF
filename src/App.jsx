import { useState } from "react";
import "./App.css";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import FileUploader from "./components/FileUploader";

//import { getDocument } from "pdfjs-dist";
//import { PDFWorker } from 'pdfjs-dist';
//import * as pdf from 'pdfjs-dist';
function App() {
  const [words, setWords] = useState();
  const [fileUpload, setFitleUpload] = useState();
  const [pdfurl,setpdfurl]= useState(null);

  // working only in the index.js file
  const pdfjs = import("../node_modules/pdfjs-dist/build/pdf.mjs");
  const pdfjsWorker = import("../node_modules/pdfjs-dist/build/pdf.worker.mjs");
  pdfjs.GlobalWorkerOptions = pdfjsWorker;

  const handleClick = async () => {
    // const blob = new Blob(); // e.g. from a file input
    const Splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 1,
    });

    if (pdfurl !== null){
    const link = pdfurl
    const fetchedpdf = await fetch(link);
    const blobpdf = await fetchedpdf.blob();
    const loader = new WebPDFLoader(blobpdf, {
      pdfjs: () => import("../node_modules/pdfjs-dist/legacy/build/pdf"),
    });
    const docs = await loader.load();
    console.log(docs);
    const splitted = await Splitter.splitDocuments(docs);
    setWords(splitted.map((wrd) => wrd.pageContent).join("\n"));
  }else{
    alert("no files being selected")
  }

  };

  return (
    <>
      <p>{words}</p>
      <FileUploader fileUpload={fileUpload} setFitleUpload={setFitleUpload} pdfurl={pdfurl} setpdfurl={setpdfurl}/>
      <button onClick={handleClick}>read</button>
    </>
  );
}
export default App;

// const pdfjs =  import ("../node_modules/pdfjs-dist/build/pdf.mjs");
// const pdfjsWorker =  import('../node_modules/pdfjs-dist/build/pdf.worker.mjs');
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
//console.log(splitted[0].pageContent);
// .then(pdfjs => {
//   // Initialize PDF.js and return its methods
//   return {
//     getDocument:  pdfjs.getDocument,
//     version: pdfjs.version,
//   };
// })
// <input type="file" onChange={handleChange} />
{/* <button type="button" onClick={handlupload}>
upload
</button> */}

// const handleChange = (e) => {
  //   setFitleUpload(e.target.files[0]);
  //   console.log("file ready for upload");
  // };

  // const handlupload = () => {
  //   const storageRef = ref(appStorage, `PDFfiles/${fileUpload.name}`);
  //   uploadBytes(storageRef, fileUpload)
  //     .then((snapshot) => getDownloadURL(snapshot.ref))
  //     .then((url)=>setpdfurl(url));
  // };
