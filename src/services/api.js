import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "https://contacts-be.herokuapp.com/",
});

export default api;
