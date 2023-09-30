'use client'
import React, {useState} from "react";
import { Inbox, Loader2 } from "lucide-react";
import {useDropzone} from 'react-dropzone';
import { uploadToS3 } from "@/src/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import toast from "react-hot-toast";

const FileUpload = () => {
    const [uploading, setUploading] = useState(false);
    const {mutate, isLoading} = useMutation({
        // For this mutation we will pass few things 
        mutationFn: async ({file_key, file_name} : {file_key: string, file_name: string})=> {
            const response = await axios.post('/api/create-chat-room', {
                // now pass two things file key and name.
                file_key,
                file_name
            });
            return response.data;
        }
    });

    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) =>{
            console.log(acceptedFiles);
            const file =acceptedFiles[0];
            if(file.size > 10*1024*1024){
                // size is bigger than 10 mb so we will not upload it to S3
                toast.error('Please upload a smaller file...');
                return;
            }

            // now if the size is small then lets actually create and upload the Amazon S3 file
            
            try {
                setUploading(true);
                const data = await uploadToS3(file);
                if(!data?.file_key || !data.file_name){
                    toast.error("Something went wrong dude");
                    return;
                }
                mutate(data, {
                    onSuccess: (data) => {
                        console.log(data);
                        toast.success(data.message);
                    },
                    onError: (err)=>{
                        toast.error("Error creating chat");
                    }
                })
                console.log('data:', data);
            } catch (error) {
                console.log(error);
            } finally{
                setUploading(false);
            }
        },
    });
    return (
        <div className="pg-2 bg-white rounded-xl">
            <div {...getRootProps({
                className: 'border-dashed border-4  rounded-xl cursor-pointer bg-gray-50 py-12 flex justify-center items-center flex-col border-black',
            })}>
                <input {...getInputProps()} />
                {(uploading || isLoading) 
                ?   (<>
                        {/* {loading state} */}
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
                        <p className="mt-2 text-sm text-slate-400">Data sending to GPT tech....</p>
                    </>)
                : (
                    <>
                    <Inbox className="w-10 h-10 text-blue-500" />
                    <p className="mt-2 text-sm">Click here to Add your PDF</p>
                    </>
                ) };
            </div>
        </div>
    );
  };
  
  export default FileUpload;