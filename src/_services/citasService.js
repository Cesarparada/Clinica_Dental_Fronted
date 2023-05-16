import axios from "axios";
import { global } from "../_global.js/global";

const citasService = {};

citasService.getCitas = async (credentials) => {
  const body = {
    email: credentials.email,
    password: credentials.password,
  };
  return (await axios.post(global.BASE_URL + "/auth/login", body)).data;
};
