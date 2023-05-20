import React, { useEffect, useState } from "react";
import authService from "../../_services/authService";
import { updateAuthStoreStateLogIn } from "../../features/authentication/updateAuthState";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const initialFormValues = {
    email: "pepe@correo.com",
    password: "12345678",
  };

  // HOOKS
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialFormValues);

  const [loginError, setLoginError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == "admin";

  useEffect(() => {
    if (authState.userToken) {
      isAdmin ? navigate("/admin") : navigate("/");
    }
  }, [authState.userToken]);

  // HANDLERS
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: formValues.email,
      password: formValues.password,
    };
    login(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  // FUNCTIONS
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      const token = response.token;

      setLoginError(null);
      updateAuthStoreStateLogIn(token);
    } catch (error) {
      console.log(error);
      setLoginError(error.response.data.message);
    }
  };

  // RETURN
  return (
    <div className="contenedor-form">
      <div className="alto">
      <div className="login-form form">
        <img
          src="/_imagenes/diente_login.png"
          className="logo-login"
          alt="logo_login"
        />
        <h1>Bienvenido</h1>

        <form noValidate onSubmit={handleSubmit}>
          <label htmlFor="">Email</label> <br />
          <input
            style={{ background: "#36455a" }}
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <br />
          <label>Password</label> <br />
          <input
            style={{ background: "#36455a" }}
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button className="button-send ">Iniciar Sesión</button>
        </form>
        <br />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
      </div>
    </div>
  );
}
