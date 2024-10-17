import React from 'react';
import { Button,Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"
import "./bg.jpg"

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <body 
            className="homepage-container d-flex flex-column align-items-center" style={{ minHeight: "100vh" }} 
           
        >
            <img 
                src="/logo.png" 
                alt="Logo" 
                className="logo-image"
            />
            <Row className="justify-content-center mt-3">
        <Col md={4} className="mb-3">
          <Button variant="primary"  className= "b-1" onClick={() => navigate("/solve")}>
            Solve
          </Button>
        </Col>
        <Col md={4} className="mb-4">
          <Button variant="primary"  className= "b-2" onClick={() => navigate("/game")}>
            Play
          </Button>
        </Col>
      </Row>
        </body>
    );
}
