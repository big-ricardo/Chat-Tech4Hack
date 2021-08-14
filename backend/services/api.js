const axios = require("axios");

const gotit_api = axios.create({
  baseURL: process.env.GOTIT_URI,
  withCredentials: true,
  auth: {
    username: process.env.GOTIT_USERNAME,
    password: process.env.GOTIT_PASSWORD,
  },
});

module.exports = gotit_api;
