'use client'
import React from "react";
import { Inbox } from "lucide-react";
import {useDropzone} from 'react-dropzone';

const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles: 1,
        onDrop: (acceptedFiles) =>{
            console.log(acceptedFiles);
        },
    });
    return (
        <div className="pg-2 bg-white rounded-xl">
            <div {...getRootProps({
                className: 'border-dashed border-4  rounded-xl cursor-pointer bg-gray-50 py-12 flex justify-center items-center flex-col border-black',
            })}>
                <input {...getInputProps()} />
                <>
                <Inbox className="w-10 h-10 text-blue-500" />
                <p className="mt-2 text-sm">Click here to Add your PDF</p>
                </>
            </div>
        </div>
    );
  };
  
  export default FileUpload;