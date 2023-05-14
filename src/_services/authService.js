import axios from "axios";
import { global } from "../_global.js/global";

const authService={};
//-----Login
authService.login = async (credentials) => {
    const body = {
        email: credentials.email,
        password: credentials.password,
    };
return (await axios.post(global.BASE_URL + "/auth/login", body)).data;
};

//------registro de usuarios
authService.registerUser = async (data) => {

    const body = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      fecha_de_nacimiento: data.fecha_de_nacimiento,
      telefono: data.telefono,
      email: data.email,
      password: data.password,
    };
  
  
    return (await axios.post(global.BASE_URL + "/auth/register", body))
      .data;
  }
//------registro de odontologo

  authService.createProfileOdontologo = async (token, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      fecha_de_nacimiento: data.fecha_de_nacimiento,
      matriculaOdontologo: data.matriculaOdontologo,
      telefono: data.telefono,
      email: data.email,
      password: data.password,
    };
  
    return (
      await axios.post(
        global.BASE_URL + `/auth/register/odontologo`,
        body,
        config
      )
    ).data;
  };
  
export default authService;