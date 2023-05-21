import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../_services/userService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./UserProfile.scss";

export default function UserProfile() {
  const navigate = useNavigate();
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

  const updateProfile = async (token, body) => {
    const response = await userService.updateProfile(token, body);
    setModifyProfile(false);
    getProfile(authState.userToken);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(authState.userToken, formValues);
  };

  const getProfile = async (token) => {
    try {
      const response = await userService.getProfile(token);
      setUser(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="contenedor-card">
        <div className="card">
          {!modifyProfile && (
            <Card style={{ width: "15rem" }}>
              <div>
                <Card.Img className="card-img" src="/_imagenes/usuario.png" />
              </div>
              <Card.Body>
                <Card.Title>Perfil del Usuario</Card.Title>
              </Card.Body>
              <ListGroup>
                <ListGroup.Item className="items">
                  Nombre: {user.nombre}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Apellidos: {user.apellidos}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Fecha de Nacimiento: <br /> {user.fecha_de_nacimiento}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Teléfono: <br /> {user.telefono}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Email: <br /> {user.email}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </div>

        {!modifyProfile && (
          <div>
            <Button
              variant="primary"
              className="btn-modificar"
              onClick={handleChangeProfile}
            >
              Modificar Perfil
            </Button>
          </div>
        )}

        {modifyProfile && (
          <div className="form modify-form">
            <Form onSubmit={handleSubmit} className="padreBtn">
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
                <br />
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Apellidos"
                  name="apellidos"
                  value={formValues.apellidos}
                  onChange={handleChange}
                />
                <br />
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  className="input"
                  type="date"
                  name="fecha_de_nacimiento"
                  value={formValues.fecha_de_nacimiento}
                  onChange={handleChange}
                />
                <br />
                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="00-000000000"
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleChange}
                />
                <br />
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
              <br />
              <Button variant="primary"  type="submit">
                Subir Cambios
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}
