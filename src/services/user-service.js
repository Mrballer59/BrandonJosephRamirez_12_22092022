import axios from "axios";
import authNav from "./auth-nav";
const API_URL = "http://localhost:3001/api/v1/user/profile";

const getUserDashbord = () => {
  return axios({
    method: "post",
    url: API_URL,
    headers: authNav(),
  });
};
const userService = {
  getUserDashbord,
};
export default userService;
