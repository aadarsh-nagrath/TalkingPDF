//This file will only run on server
import AWS from "aws-sdk";
import fs from 'fs';

export async function downloadS3(file_key: string){
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY!,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
        }) // config aws object
        const s3 = new AWS.S3({
            params: {
                Bucket : process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: 'ap-south-1'
        });

        const params = {
            Bucket : process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
        }

        //With above programs we can access the S3 buckets

        const obj = await s3.getObject(params).promise(); // Now this obj contains the actual file object
        const file_name = `/temp/pdf-${Date.now()}.pdf`
        fs.writeFileSync(file_name, obj.Body as Buffer );
        return file_name
    } catch (error) {
        console.log(error);
        return null;
    }
}