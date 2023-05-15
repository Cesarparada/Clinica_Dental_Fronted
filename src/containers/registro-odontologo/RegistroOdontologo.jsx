import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import { useState } from "react";
import { useSelector } from "react-redux";

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
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <br />
      <h1>Registro de Personal</h1>
      <br />
      {isAdmin && (
        <Form onSubmit={handleSubmit} className="padreBtn">
          <pre style={{ textAlign: "left", width: "250px", margin: "auto" }}>
            {JSON.stringify(formValues, null, 2)}
          </pre>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <br />
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos"
              name="apellidos"
              value={formValues.apellidos}
              onChange={handleChange}
            />
            <br />
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fecha_de_nacimiento"
              value={formValues.fecha_de_nacimiento}
              onChange={handleChange}
            />
            <br />
            <Form.Label>Matrícula de Profesional</Form.Label>
            <Form.Control
              type="text"
              placeholder="000000000"
              name="matriculaOdontologo"
              value={formValues.matriculaOdontologo}
              onChange={handleChange}
            />
            <br />
            <Form.Label>Número de Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="00-000000000"
              name="telefono"
              value={formValues.telefono}
              onChange={handleChange}
            />
            <br />
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.mail"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <br />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="***********"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Crear Registro
          </Button>
        </Form>
      )}
    </>
  );
}
