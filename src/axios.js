import axios from "axios";

var instance = axios.create({
  baseURL: "https://react-my-burger-3ad9e.firebaseio.com/"
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = "Auth_Token";
instance.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
instance.interceptors.request.use(
  request => {
    //console.log("Interceptor Request: ", request);
    return request;
  },
  error => {
    //console.log("Request error: ", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
        console.log("Interceptor Response: ", response);
    return response;
  },
  error => {
    console.log("Response error: ", error);
    return Promise.reject(error);
  }
);

export default instance;
