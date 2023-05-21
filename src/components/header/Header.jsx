import React from "react";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineLogin,
} from "react-icons/md";

export default function Header() {
  // HOOKS
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == "admin";


  // HANDLERS
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><img src="/_imagenes/herramientas-de-dentista.png" alt="" style={{width:"50px"}}/></Navbar.Brand>
        <Navbar.Brand href="/">Clínica Dental</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && !isAdmin && (
                <Nav.Link href="/citas">Citas</Nav.Link>
            )}
            {isAdmin && (
              <>
                <NavDropdown title="Sala Admin" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                  <NavDropdown.Item href="/registroOdontologo">
                    Regitro Odontologo
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn && (
              <>
                <Nav.Link href="/login">
                  <MdOutlineLogin />
                  Login
                </Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <NavDropdown title={name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    <MdPersonOutline className="icon" />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <MdOutlineLogout />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
