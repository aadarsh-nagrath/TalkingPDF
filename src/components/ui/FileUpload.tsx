'use client'
import React from "react";
import { Inbox } from "lucide-react";
import {useDropzone} from 'react-dropzone';
import { uploadToS3 } from "@/src/lib/s3";

const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) =>{
            console.log(acceptedFiles);
            const file =acceptedFiles[0];
            if(file.size > 10*1024*1024){
                // size is bigger than 10 mb so we will not upload it to S3
                alert('Please upload a smaller file...');
                return
            }

            // now if the size is small then lets actually create and upload the Amazon S3 file
            
            try {
                const data = await uploadToS3(file);
                console.log('data:', data);
            } catch (error) {
                console.log(error);
            }
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