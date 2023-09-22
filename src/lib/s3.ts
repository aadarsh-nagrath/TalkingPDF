import AWS from 'aws-sdk';

export async function uploadToS3(file: File){
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        });
        const s3 = new AWS.S3({
            params: {
                Bucket : process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: 'ap-south-1'
        })

        const file_key = 'upload/' + Date.now().toString() + file.name.replace(' ', '-');
        // Path and name of the file in which it will be saved

        // Define params
        
        const params = {
            Bucket : process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file
        }

        const upload = s3.putObject(params).on('httpUploadProgress', evt => {
            console.log('Uploading To s3 ..............', parseInt(((evt.loaded*1000)/evt.total).toString())) + '%'
            // this will show the percentage of file uploaded to s3
        }).promise()

        await upload.then(data => {
            console.log("Successfully uploaded the file.....to S3", file_key)
        })

        return Promise.resolve({
            file_key,
            file_name: file.name,
            // we will be using these parameters to save it to our database later
        });

    } catch (error) {}
}

//creating one more utility function - 
export function getS3Url(file_key: string) {
    // this function will take file_key as a string and provide us a publically accessable S3 link
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
    return url;
}