import React, { useState } from 'react';
import { Form, Button, Alert,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import "./SolvePage.css"
import "./bg.jpg"

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
        <body className="d-flex flex-column align-items-center position-relative container-class solve-body" style={{ minHeight: "100vh" 
      }}
          >
            <h1 className='header'>Enter Your Choice Of Words</h1>
            <div className="mb-3">
            <Form className='body'>
        <Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label className='t-1'>Start Word</Form.Label>
              <Form.Control
                type="text"
                value={startWord}
                onChange={(e) => setStartWord(e.target.value)}
                placeholder="Enter start word"
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group >
              <Form.Label className='t-2'>End Word</Form.Label>
              <Form.Control
                type="text"
                value={endWord}
                onChange={(e) => setEndWord(e.target.value)}
                placeholder="Enter end word"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" className='b' onClick={handleSolve}>
            SOLVE
          </Button>
        </div>
            </Form>
            </div>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {wordLadder.length > 0 && (
        <div className="word-ladder-container mt-3">
          {wordLadder.map((word, index) => (
            <Form.Control
              key={index}
              readOnly
              className={
                index === 0 ? "word-ladder-item start-word" : 
                index === wordLadder.length - 1 ? "word-ladder-item end-word" : 
                  "word-ladder-item" 
              }
              value={word}
            />
          ))}
        </div>
            )}
        </body>
    );
}