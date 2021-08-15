import aws4 from "aws4";

export default function () {
  let request = {
    host: 'https://86n9g4owfh.execute-api.sa-east-1.amazonaws.com/homolg',
    method: 'GET',
    url: 'https://myapi.execute-api.us-west-2.amazonaws.com/Prod/foos',
    path: '/Prod/foos'
  }

  return {
    upload: function(file){
      let signedRequest = aws4.sign(request,
        {
          // assumes user has authenticated and we have called
          // AWS.config.credentials.get to retrieve keys and
          // session tokens
          secretAccessKey: "d7Db72OTeXa2zp5OJGP4IR5HNlY4ilbp+Lt5hb/w",
          accessKeyId: "AKIARZJ56O723XMCULHS",
          sessionToken: AWS.config.credentials.sessionToken
        })

      delete signedRequest.headers['Host']
      delete signedRequest.headers['Content-Length']
    },
    file: function(){

    }
  }
}
