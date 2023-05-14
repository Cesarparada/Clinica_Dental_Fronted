import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import { useState } from "react";

export default function Register() {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };
  const handleSubmit = () => {
    registerUser(formValues);
  };
  const registerUser = async (body) => {
    try {
      const response = await authService.registerUser(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <br />
      <h1>Registrarse</h1>
      <br />

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
          <br />
          <Form.Check
            type="checkbox"
            label="* He leído y acepto la política de privacidad"
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </>
  );
}
