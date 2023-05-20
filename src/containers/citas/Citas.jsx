import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import citaService from "../../_services/citaService";
import { useSelector } from "react-redux";
import { DataListTable } from "../../components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import "./Citas.scss";

export default function Citas() {
  //hooks
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isLoggedIn = authState.isLoggedIn;
  const isOdontologo = authState.userInfo.role == "odontologo";
  const isPatient = authState.userInfo.role == "user";
  const [cita, setCita] = useState([]);
  const [idCita, setIdCita] = useState();
  const [formValues, setFormValues] = useState({});
  const [formCreateCita, setCreateCita] = useState(false);
  const [formUpdateCita, setFormUpdateCita] = useState(false);
  const [formDeleteCita, setFormDeleteCita] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isPatient) {
      getCitasPaciente(authState.userToken);
    } else if (isLoggedIn && isOdontologo) {
      getCitasOdontologos(authState.userToken);
    } else {
      navigate("");
    }
  }, []);

  const handleCitas = (e) => {
    const { dataId } = e.currentTarget.dataset;
    console.log(dataId);
  };

  //handler para escuchar cambio en inputs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };

  const handleChangeIdCita = (e) => {
    const { value } = e.target;
    setIdCita(value);
    console.log(idCita);
  };

  const handleDeleteCita = (e) => {
    const { value } = e.target;
    setIdCita(value);
    console.log(idCita);
  };

  //handlers que cambian el valor para pintar y ocultar formularios

  const handleFormUpdateCita = () => {
    setFormUpdateCita(true);
    setCreateCita(false);
    setFormDeleteCita(false);
  };

  const handleFormDeleteCita = () => {
    setFormDeleteCita(true);
    setCreateCita(false);
    setFormUpdateCita(false);
  };

  const handleFormCreateCita = () => {
    setCreateCita(true);
    setFormUpdateCita(false);
    setFormDeleteCita(false);
  };

  //Handlers que llaman a la funcion para ejecutar la peticion

  const handleSubmitUpdate = () => {
    updateCita(authState.userToken, formValues, idCita);
  };

  const handleSubmitCreate = () => {
    createCita(authState.userToken, formValues);
  };

  const handleSubmitDelete = () => {
    deleteCita(authState.userToken, idCita);
  };

  //funcion que llama al servicio citas paciente
  const getCitasPaciente = async (token) => {
    try {
      const response = await citaService.getCitasPaciente(token);
      setCita(response.cita);
    } catch (error) {
      console.log(error);
    }
  };

  //funcion que llama al servicio citas odontologo
  const getCitasOdontologos = async (token) => {
    try {
      const response = await citaService.getCitasOdontologo(token);
      setCita(response.cita);
    } catch (error) {
      console.log(error);
    }
  };

  //funcion que llama al servicio crear citas
  const createCita = async (token, body) => {
    try {
      const response = await citaService.createCita(token, body);
    } catch (error) {
      console.log(error);
    }
  };

  //funcion que llama al servicio modificar citas
  const updateCita = async (token, data, idCita) => {
    try {
      const response = await citaService.updateCita(token, data, idCita);
    } catch (error) {
      console.log(error);
    }
  };

  //funcion que llama al servicio eliminar citas
  const deleteCita = async (token, idCita) => {
    try {
      const response = await citaService.deleteCita(token, idCita);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="item-citas">
        {isOdontologo && (
          <div className="tabla-citas">
            <DataListTable
              data={cita}
              title="Tus citas"
              headers={["ID cita", "ID paciente", "Fecha", "Hora"]}
              attributes={["id", "id_paciente", "fecha", "horario"]}
              onChange={handleCitas}
              
            /> <div className="item-odontologo">
              <img className="img-odontologo" src="/_imagenes/dental.png" alt="odontologo" />
            </div>
          </div>
        )}

        {isPatient && (
          <>
            <div>
              <DataListTable
                data={cita}
                title="Tus citas"
                headers={["ID cita", "ID odontologo", "Fecha", "Hora"]}
                attributes={["id", "id_odontologo", "fecha", "horario"]}
                onChange={handleCitas}
              />
            </div>
            <div className="acordion">
            <div >
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={handleFormCreateCita}>
                    Crear cita
                  </Accordion.Header>
                  <Accordion.Body>
                    {formCreateCita && (
                      <Form onSubmit={handleSubmitCreate}>
                        <Form.Group>
                          <Form.Label>id_odontologo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="id_odontologo "
                            name="id_odontologo"
                            value={formValues.id_odontologo}
                            onChange={handleChange}
                          />
                          <Form.Label>Día de la cita</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="fecha"
                            name="fecha"
                            value={formValues.fecha}
                            onChange={handleChange}
                          />
                          <Form.Label>Horario </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="10:00:00 "
                            name="horario"
                            value={formValues.horario}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          className="buttonUpdate"
                        >
                          Crear cita
                        </Button>
                      </Form>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={handleFormUpdateCita}>
                    Modificar cita
                  </Accordion.Header>
                  <Accordion.Body>
                    {formUpdateCita && (
                      <Form onSubmit={handleSubmitUpdate}>
                        <Form.Group>
                          <Form.Label></Form.Label>
                          <Form.Label>Identificador de cita</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="5"
                            name="idCita"
                            onChange={handleChangeIdCita}
                          />
                          <Form.Label>Día de la cita</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="fecha"
                            name="fecha"
                            value={formValues.fecha}
                            onChange={handleChange}
                          />
                          <Form.Label>Horario </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="10:00:00 "
                            name="horario"
                            value={formValues.horario}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="buttonUpdate"
                        >
                          Modificar
                        </Button>
                      </Form>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header onClick={handleFormDeleteCita}>
                    Eliminar Cita
                  </Accordion.Header>
                  <Accordion.Body>
                    {formDeleteCita && (
                      <Form onSubmit={handleSubmitDelete}>
                        <Form.Group>
                          <Form.Label></Form.Label>
                          <Form.Label>Identificador de cita</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="5"
                            name="idCita"
                            onChange={handleDeleteCita}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="buttonUpdate"
                        >
                          Eliminar
                        </Button>
                      </Form>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
