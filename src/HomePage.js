import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Button className="mb-3" onClick={() => navigate('/solve')}>Solve</Button>
            <Button onClick={() => navigate('/game')}>Play</Button>
        </Container>
    );
}

export default HomePage;