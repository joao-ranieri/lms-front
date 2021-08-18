import axios from "axios";
import { aws4Interceptor } from "aws4-axios";

const awsAxios = axios.create({
  baseURL: 'https://86n9g4owfh.execute-api.sa-east-1.amazonaws.com/homolg',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Host': '86n9g4owfh.execute-api.sa-east-1.amazonaws.com'
  },
});

const interceptor = aws4Interceptor(
  {
    region: "sa-east-1",
    service: "execute-api",
  },
  {
    accessKeyId: "AKIARZJ56O723XMCULHS",
    secretAccessKey: "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",
  }
);

awsAxios.interceptors.request.use(interceptor);

export default function () {
  return {
    upload: function(file){
      awsAxios.put(`/file?key=masters-lms-bucket/${file.name}`, file)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    file: function(){

    }
  }
}
