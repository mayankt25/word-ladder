import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

export const SolvePage = () => {
    const [startWord, setStartWord] = useState("");
    const [endWord, setEndWord] = useState("");
    const [wordLadder, setWordLadder] = useState([]);
    const [error, setError] = useState("");

    const handleSolve = async () => {
        setError("");
        try {
            const response = await axios.get(`https://this.api.com/is/from/dora?start=${startWord}&end=${endWord}`);
            setWordLadder(response.data);
        } catch (error) {
            setError("Failed to retrieve word ladder");
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <h1>Solve Word Ladder</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Start Word</Form.Label>
                    <Form.Control
                        type="text"
                        value={startWord}
                        onChange={(e) => setStartWord(e.target.value)}
                        placeholder="Enter start word"
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>End Word</Form.Label>
                    <Form.Control
                        type="text"
                        value={endWord}
                        onChange={(e) => setEndWord(e.target.value)}
                        placeholder="Enter end word"
                    />
                </Form.Group>
                <Button className="mt-3" onClick={handleSolve}>Solve</Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {wordLadder.length > 0 && (
                <Alert variant="success" className="mt-3">
                    Word Ladder: {wordLadder.join(" -> ")}
                </Alert>
            )}
        </Container>
    );
}