import { Pinecone } from '@pinecone-database/pinecone';
import {downloadS3} from './s3-server';

let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
    if (!pinecone) {
        pinecone = new Pinecone({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!
        });
    }
    return pinecone;
};

export async function loadS3IntoPinecone(fileKey: string){
    // get the pdf so download and read it
    console.log("Downloading s3 into file system");
    const file_name = await downloadS3(fileKey);
};
