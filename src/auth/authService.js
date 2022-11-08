import axios from "axios";
const API_URL = "http://localhost:3001/api/v1/user/";

// services for login and request by the axios
const login = async ({ email, password }) => {
  return await axios
    .post(API_URL + "login", { email, password })
    .then((res) => {
      //console.log(res.data)
      //console.log(email, password)
      return res.data;
    })
    .catch((error) => console.log(error));
};

// service for get User's Profile request by the axios
const userProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .post(API_URL + "profile", profileData, config)
    .then((res) => {
      //console.log(res.data.body)
      return res.data.body;
    })
    .catch((error) => console.log(error));
};
//update user profile
// service for edit User's Profile request by the axios
const updateUserData = async (newData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .put(API_URL + "profile", newData, config)
    .then((res) => {
      //console.log(res.data.body)
      return res.data.body;
    })
    .catch((error) => console.log(error));
};
const authService = { login, userProfile, updateUserData };
export default authService;
