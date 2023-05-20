import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./RegistroOdontologo.scss";

export default function RegistroOdontologo() {
  const authState = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({});
  const isAdmin = authState.userInfo.role == "admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };
  const handleSubmit = () => {
    createProfileOdontologo(authState.userToken, formValues);
  };

  const createProfileOdontologo = async (token, data) => {
    try {
      const response = await authService.createProfileOdontologo(token, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" form-odontologo">
        <div className="form">
          <h1>Registro de Odontologo</h1>

          {isAdmin && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                />

                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Apellidos"
                  name="apellidos"
                  value={formValues.apellidos}
                  onChange={handleChange}
                />

                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  className="input"
                  type="date"
                  name="fecha_de_nacimiento"
                  value={formValues.fecha_de_nacimiento}
                  onChange={handleChange}
                />

                <Form.Label>Matrícula de Profesional</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="000000000"
                  name="matriculaOdontologo"
                  value={formValues.matriculaOdontologo}
                  onChange={handleChange}
                />

                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="00-000000000"
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleChange}
                />

                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="input"
                  type="email"
                  placeholder="ejemplo@correo.mail"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />

                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="input"
                  type="password"
                  placeholder="***********"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Crear Registro
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
