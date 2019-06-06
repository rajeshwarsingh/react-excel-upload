import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import SpreadsheetComponent from 'react-spreadsheet-component'
import csv from 'csvtojson'
import uploadcss from '../css/upload.css'

export default function MyDropzone(props) {

  const onDrop = useCallback(csvFile => {
    let fileJSONArray = []
    const fr = new FileReader();
   fr.onload = function () {
     const res = fr.result;
     csv({
    noheader:true
}).fromString(res)
     .subscribe((csvLine) => {
       console.log("csvLine+++++++",csvLine)
       fileJSONArray.push(csvLine);
     })
     .on('done', (error) => {
       // NOTE: A callback to FileUploader Component to send CSV-JSON transformed Data
       console.log("fileJSONArray+++++++",fileJSONArray)
       props.getFileData(fileJSONArray)
     });
   };
   fr.readAsText(csvFile[0]);

   // // Do something with the files
    // console.log("*****",acceptedFiles)
    // props.getFileData(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div class="btn">
     <div {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div></div>

  )
}
