import axios from "axios";
//Set the Endpoint
const API_URL = "http://localhost:3001/api/v1/user/login";
// go get the data and store it
const login = (email, password) => {
  return axios
    .post(API_URL, {
      email,
      password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("email", JSON.stringify(res.data));
      }
      return res.data;
    });
};

const authService = {
  login,
};
export default authService;
