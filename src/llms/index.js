import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";


// const docmnetLoader = async () => {
//   const Splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 50,
//     chunkOverlap: 1,
//   });
  
// const loader = new DirectoryLoader("../assets", {
//     ".pdf": (path) => new PDFLoader(path),
//   });
//   const loaded = await loader.load();

//   const splitted = await Splitter.splitDocuments(loaded);
//   console.log(splitted);
// };

const webpfdloader= async(link)=>{
// const blob = new Blob(); // e.g. from a file input

const Splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 1,
  });
const fetchedpdf= await fetch(link)
const blobpdf= await fetchedpdf.blob()
const loader = new WebPDFLoader(blobpdf);
const docs = await loader.load();
const splitted = await Splitter.splitDocuments(docs);
console.log(splitted);
}

const link= "https://firebasestorage.googleapis.com/v0/b/pdfchat-7d24d.appspot.com/o/documnets%2FEritreasport.pdf?alt=media&token=805d6148-18be-4dc2-ba3d-0bd5e25b0a86"

webpfdloader(link)

//docmnetLoader()



