import axios from "axios";

//TODO: change baseURL before deploy
const instance = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "https://api-dot-mern-314313.oa.r.appspot.com/",
});

export default instance;
