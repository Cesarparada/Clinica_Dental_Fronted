import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import citaService from '../../_services/citaService';
import { useSelector } from 'react-redux';
import { DataListTable } from '../../components';

export default function Citas() {
//hooks
const authState = useSelector((state) => state.auth); 
const navigate = useNavigate();
const isLoggedIn = authState.isLoggedIn;
const isOdontologo = authState.userInfo.role == "odontologo";
const isPatient = authState.userInfo.role =="user";
const [cita, setCita] = useState([]);



useEffect(()=> {
  if(isLoggedIn && isPatient){
    getCitasPaciente(authState.userToken);
  }else if (isLoggedIn && isOdontologo){
    getCitasOdontologos(authState.userToken);
  }else{
    navigate("");
  }
}, []);

const handleCitas = (e) => {
  const {dataId}= e.currentTarget.dataset;
  console.log(dataId);
};

//funcion que llama al servicio citas paciente
const getCitasPaciente = async (token) => {
  try{
    const response = await citaService.getCitasPaciente(token);
    setCita(response.cita);
  }catch(error){
    console.log(error);
  }
};

//funcion que llama al servicio citas odontologo
  const getCitasOdontologos = async (token) => {
    try{
      const response = await citaService.getCitasOdontologo(token);
      setCita(response.cita);
    }catch(error){
      console.log(error);
    }
  };





  return (
    <>
    <div>
    
        {isOdontologo && (
          <DataListTable
            data={cita}
            title="Tus citas"
            headers={["ID cita", "ID paciente", "Fecha", "Hora"]}
            attributes={["id", "id_paciente", "fecha", "horario"]}
            onChange={handleCitas}
          />
        )}
      
    {isPatient && (
          <div className="container">
            
              <DataListTable
                data={cita}
                title="Tus citas"
                headers={["ID cita", "ID odontologo", "Fecha", "Hora"]}
                attributes={["id", "id_odontologo", "fecha", "horario"]}
                onChange={handleCitas}
              />
            
            {/* <div className="contenedor-botones">
                <div>
                  <button type="submit" onClick={handleFormCreateCita}>
                    Crear cita
                  </button>
                </div>
                <div>
                  <button type="submit" onClick={handleFormUpdateCita}>
                    Modificar cita
                  </button>
                </div>
                <div>
                  <button type="submit" onClick={handleFormDeleteCita}>
                    Eliminar Cita
                  </button>
                </div>
              </div>
           */}
          </div>
        )}

    </div>
    </>
  )
}
