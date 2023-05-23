import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import { useState } from "react";
import "./Register.scss";
import validator from "validator";

export default function Register() {
  const [formValues, setFormValues] = useState({});
  const [validated, setValidated] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [emailRegisterError, setEmailRegisterError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };

  const registerUser = async (credentials) => {
    try {
      const response = await authService.registerUser(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      registerUser(formValues);
      
    }
    setValidated(true);

    if (formValues.password) {
      if (
        !validator.isByteLength(formValues.password, { min: 8, max: undefined })
      ) {
        setRegisterError("La contraseña debe contener mínimo 8 caracteres");
      } else if (
        validator.isByteLength(formValues.password, { min: 8, max: undefined })
      ) {
        setRegisterError(null);
      }
    }
    if (formValues.email) {
      if (!validator.isEmail(formValues.email)) {
        e.preventDefault();
        return setEmailRegisterError("Introduce un email");
      } else if (validator.isEmail(formValues.email)) {
        setEmailRegisterError(null);
      }
    }
  };
  return (
    <div className="contenedor-form">
      <div className="alto-register">
        <div className="register-form form">
          <img
            src="/_imagenes/register.png"
            className="logo-register"
            alt="logo-register"
          />

          <h1>Registrarse</h1>

          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3  rounded p-4 inputForm">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Nombre "
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Apellidos "
                name="apellidos"
                value={formValues.apellidos}
                onChange={handleChange}
              />
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                className="input"
                type="date"
                placeholder="fecha de nacimiento "
                name="fecha_de_nacimiento"
                value={formValues.fecha_de_nacimiento}
                onChange={handleChange}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input"
                type="email"
                placeholder="correo@email.com"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Teléfono "
                name="telefono"
                value={formValues.telefono}
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

              <Form.Check
                type="checkbox"
                label="* He leído y acepto la política de privacidad"
              />
            </Form.Group>
            
          {registerError && <p style={{ color: "red" }}>{registerError}</p>}
            {emailRegisterError && (
              <p style={{ color: "red" }}>{emailRegisterError}</p>
            )}

            <Button variant="primary" type="submit">
              Registrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
