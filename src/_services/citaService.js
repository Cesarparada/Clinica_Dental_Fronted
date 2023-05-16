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

//servicio crear cita
citaService.createCita = async (token, data) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    id_odontologo: data.id_odontologo,
    fecha: data.fecha,
    horario: data.horario
  }
  return (await axios.post(global.BASE_URL + `/citas/createcita`, body, config))
  .data;
}

//servicio modificar cita
citaService.updateCita = async (token, data, idCita) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    fecha: data.fecha,
    horario: data.horario,
  };
  return (
    await axios.put(
      global.BASE_URL + `/citas/updatecita/${idCita}`,
      body,
      config
      )
      ).data;
    };
    
    //servicio eliminar cita
    citaService.deleteCita = async (token, idCita) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return (
        await axios.delete(global.BASE_URL + `/citas/deletecita/${idCita}`, config)
        ).data;
      };
      export default citaService;