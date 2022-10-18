import axios from "axios";
import authHeader from "./auth-nav";

const API_URL = "http://localhost:3001/api/v1/user/profile";

const putUser = (firstName, lastName) => {
  console.log(firstName, lastName);
  return axios
    .put(
      API_URL,
      {
        firstName: firstName,
        lastName: lastName,
      },
      { headers: authHeader() }
    )
    .then((res) => {
      return res.data;
    });
};
const editService = {
  putUser,
};

export default editService;
