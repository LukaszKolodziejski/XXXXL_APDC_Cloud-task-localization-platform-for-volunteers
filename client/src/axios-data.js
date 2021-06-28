import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://fct-apdc-1-account-management-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
