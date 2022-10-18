export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  if (token) {
    return {
      authorization: "Bearer " + token,
      "Content-type": "application/json",
      "X-Custom-Header": "header value",
    };
  } else {
    return {};
  }
}
