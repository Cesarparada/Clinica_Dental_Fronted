import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import { useState } from "react";
import "./Register.scss"

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
    <div className="contenedor-form">
      <div className="register-form form">
      <br />
      <h1>Registrarse</h1>
      <br />

      <Form onSubmit={handleSubmit} >
        {/* <pre style={{ textAlign: "left", width: "250px", margin: "auto" }}>
          {JSON.stringify(formValues, null, 2)}
        </pre> */}
              <Form.Group className="mb-3  rounded p-4 inputForm">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre "
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos "
              name="apellidos"
              value={formValues.apellidos}
              onChange={handleChange}
            />
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              placeholder="fecha de nacimiento "
              name="fecha_de_nacimiento"
              value={formValues.fecha_de_nacimiento}
              onChange={handleChange}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@mail.com"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono "
              name="telefono"
              value={formValues.telefono}
              onChange={handleChange}
            />
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
        <Button variant="primary" className="btn-register" type="submit">
          Registrar
        </Button>
      </Form>
      </div>
    </div>
  );
}
