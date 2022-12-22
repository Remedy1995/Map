import axios from "axios";
//import {useNavigate} from "react-router-dom";


const token = localStorage.getItem("token_key");
const axiosClient = axios.create({
    baseURL: `https://a3gzm9fm65.execute-api.eu-west-1.amazonaws.com`,
    headers: {
        'Content-Type': 'application/json',
      },
  });
 
axiosClient.interceptors.request.use(
    function (response) {
   response.headers.Authorization = token ?`Bearer ${token}`: '';
      return response;
    }, 
    function (error) {
      let res = error.response;
      if (res.status === 401) {
        window.location.href = 'http://localhost:3000';
      }
      console.error('Looks like there was a problem. Status Code: ' + res.status);
      return Promise.reject(error);
    }
  );


  axiosClient.interceptors.response.use(function (response){
    return response;
  },function(error){
   console.log(error.response.status)
   if (error.response.status===403){
    window.location.href = 'http://localhost:3000';
   }
    return error;
  }
  )
export default axiosClient;