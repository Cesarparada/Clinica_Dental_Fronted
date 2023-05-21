import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "./Home.scss";
import Card from 'react-bootstrap/Card';


export default function Home() {
  return (
    <div className='homediv'> 
    <div className='titulo-home' >
    <h1> <span>Sonríe con los mejores</span> </h1>
   </div>
    
    <div className='info-home'>
 
    <Card className='cards-items' style={{ width: '15rem', height:'26rem' }}>
      <Card.Img className='img-card-home' variant="top" src="/_imagenes/cuidado-dental.png" />
      <Card.Body>
        <Card.Title>Los Mejores Profesionales</Card.Title>
        <Card.Text>
        Contamos con profesionales especialistas para cada tratamiento.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='cards-items' style={{ width: '15rem',height:'26rem' }}>
      <Card.Img className='img-card-home' variant="top" src="/_imagenes/dentista.png" />
      <Card.Body>
        <Card.Title>Materiales de primera calidad</Card.Title>
        <Card.Text>
        Solo trabajamos con equipos y materiales de la más alta calidad.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='cards-items' style={{ width: '15rem',height:'26rem' }}>
      <Card.Img className='img-card-home' variant="top" src="/_imagenes/diente.png" />
      <Card.Body>
        <Card.Title>Fuertes valores éticos</Card.Title>
        <Card.Text>
        Defendemos la práctica odontológica ética y transparente.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='cards-items' style={{ width: '15rem',height:'26rem' }}>
      <Card.Img className='img-card-home' variant="top" src="/_imagenes/sillon-de-dentista.png" />
      <Card.Body>
        <Card.Title>Excelentes Precios y Flexibilidad de Pagos</Card.Title>
        <Card.Text>
          Pecios competitivos y con excelentes planes de pagos.
        </Card.Text>
      </Card.Body>
    </Card>

   
    </div>
    
    <div>
    <Carousel>
      <Carousel.Item interval={1000}>
        <img  height={200}
          className="d-block w-100"
          src="/_imagenes/carousel3.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h2>Sonríe con todos</h2>
          <p>Todos queremos sonreir </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img 
        height={200}
          className="d-block w-100"
          src="/_imagenes/carousel1.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h2>El mejor tratamiento bucal</h2>
          <p>Haz lo mejor para tu sonrisa</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height={200}
          className="d-block w-100"
          src="/_imagenes/carousel2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h2>Tramientos especiales</h2>
          <p>
           Logra una sonrisa con los mejores profesionales
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
 

    </div>

   </div>
  )
}
