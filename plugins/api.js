export default ({ $axios }, inject) => {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      }
    }
  })

  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config.url)
  // })
  //
   api.setBaseURL('https://njs-lms-api.herokuapp.com/api/');
  //
  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })

  inject('api', api)
}
