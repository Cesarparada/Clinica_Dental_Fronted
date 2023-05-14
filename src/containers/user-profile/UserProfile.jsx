import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../_services/userService";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [modifyProfile, setModifyProfile] = useState(false);
  const [formValues, setFormValues] = useState({});
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;

  useEffect(() => {
    if (authState.userToken) {
      getProfile(authState.userToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };

  const handleChangeProfile = () => {
    setModifyProfile(true);
  };

  const handleSubmit = () => {
    updateProfile(authState.userToken, formValues);
  };
  const updateProfile = async (token, body) => {
    const response = await userService.updateProfile(token, body);
  };

  const getProfile = async (token) => {
    try {
      const response = await userService.getProfile(token);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div>
      {!modifyProfile && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />

          <Card.Body>
            <Card.Title>Perfil del Usuario</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Nombre: {user.nombre}</ListGroup.Item>
            <ListGroup.Item>Apellidos: {user.apellidos}</ListGroup.Item>
            <ListGroup.Item>
              Fecha de Nacimiento: <br /> {user.fecha_de_nacimiento}
            </ListGroup.Item>
            <ListGroup.Item>
              Teléfono: <br /> {user.telefono}
            </ListGroup.Item>
            <ListGroup.Item>
              Email: <br /> {user.email}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </div>
    <div>
      <Button variant="warning" onClick={handleChangeProfile}>Modificar Perfil</Button>
      </div>

      {modifyProfile && (
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
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Subir Cambios
        </Button>
      </Form>
      ) }
      </>
  );
}
