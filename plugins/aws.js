import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

const s3conf = {
  accessKeyId: "AKIARZJ56O72WLO3WGIE",
  secretAccessKey: "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",
}

const client = new S3Client({credentials: s3conf, region: "sa-east-1"})

export default function () {
  return {
    getFile: async function (Key = 'arquivos/eu.jpg') {
      const getObjectCommand = new GetObjectCommand({Bucket: 'masters-lms-bucket', Key})
      const response = await client.send(getObjectCommand);
      console.log(response.Body)
    },
    postFile: async function(directory, file) {
      const putObjectCommand = new PutObjectCommand({
        Bucket: 'masters-lms-bucket',
        Key: directory+file.name,
        Body: file,
        ContentType: file.type
      });
      try {
        const response = await client.send(putObjectCommand);
      } catch (err) {
        console.log("Error", err);
      }
    }
  }
}
