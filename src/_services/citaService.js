import axios from "axios";
import { global } from "../_global.js/global";

//servicio ver citas como paciente

const citaService = {};

citaService.getCitasPaciente = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/citas/cita`, config)).data;
};

//servicio ver citas como odontologo
citaService.getCitasOdontologo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/citas/cita/odontologo`, config))
    .data;
};

export default citaService;