import axios from "axios";

const instance = axios.create({
  baseURL: "https://discordapiclone.herokuapp.com",
});

export default instance;
