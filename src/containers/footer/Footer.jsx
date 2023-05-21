import React from "react";
import { MDBFooter, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import "./Footer.scss";

export default function Footer() {
  return (
    <MDBFooter className="bg-primary text-center text-white">
      <MDBContainer className="p-4 pb-0">
        <section className="mb-4">
          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="mailto:cesard.0925@gmail.com"
            role="button"
          >
            <img className="icon" src="/_imagenes/gmail.png" alt="" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://www.linkedin.com/in/c%C3%A9sar-parada-castillo/"
            role="button"
          >
            <img className="icon" src="/_imagenes/linkedin.png" alt="" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://github.com/Cesarparada"
            role="button"
          >
            <img className="icon" src="/_imagenes/github.png" alt="" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className="text-center  p-3" style={{ backgroundColor: " #070a0c" }}>
        © 2023 Cesar Parada
      </div>
    </MDBFooter>
  );
}
