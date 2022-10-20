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
      // console.log(res.data);
      if (res.data.body.token) {
        localStorage.setItem("token", JSON.stringify(res.data.body.token));
      }
      return res.data;
    });
};
// this will need to be in a funciton button so when the user clicks it invokes the users token
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
};

const authService = {
  login,
  logout,
};
export default authService;
