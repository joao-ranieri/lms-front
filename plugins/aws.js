import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import S3 from 'aws-sdk/clients/s3';

const s3conf = {
  accessKeyId: "AKIARZJ56O72WLO3WGIE",
  secretAccessKey: "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",
}

const client = new S3Client({credentials: s3conf, region: "sa-east-1"})

let s3 = new S3({
  accessKeyId: "AKIARZJ56O72WLO3WGIE",
  secretAccessKey: "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",
  region: 'sa-east-1'
});

export default function () {
  return {
    getFile: async function (Key = 'arquivos/eu.jpg') {
      const data = await s3.getObject({Bucket: 'masters-lms-bucket', Key}).promise();
      return data.Body.toString('base64');    
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
