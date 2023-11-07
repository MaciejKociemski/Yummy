// axiosConfig.js

import axios from "axios";

// Twój niestandardowy adres URL
const baseURL = "https://yummy.com/api/v1";

const instance = axios.create({
  baseURL,
});

export default instance;
