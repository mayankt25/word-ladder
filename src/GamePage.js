import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function GamePage() {
    const [startWord, setStartWord] = useState("");
    const [endWord, setEndWord] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [inputWord, setInputWord] = useState("");
    const [wordHistory, setWordHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWordsOfSameLength(5).then(({ start, end }) => {
            setStartWord(start);
            setEndWord(end);
            setCurrentWord(start);
            setLoading(false);
        });
    }, []);

    const handleInputChange = (e) => {
        setInputWord(e.target.value);
    };

    const handleAddWord = () => {
        if (inputWord.length > startWord.length) {
            toast.error(`Word length must not exceed ${startWord.length} characters!`);
        } else {
            checkIfWordExists(inputWord).then((exists) => {
                if (!exists) {
                    toast.error("Word does not exist!");
                } else if (!isOneLetterDifference(currentWord, inputWord)) {
                    toast.error("Word must differ by exactly one letter!");
                } else {
                    setWordHistory([...wordHistory, inputWord.toUpperCase()]);
                    setCurrentWord(inputWord.toUpperCase());
                }
            });
        }
        setInputWord(""); 
    };

    const fetchWordsOfSameLength = async (maxLength) => {
        let startWord = "";
        let endWord = "";
        try {
            const randomLength = Math.floor(Math.random() * (maxLength - 3 + 1)) + 3;
            const startResponse = await axios.get(`https://random-word-api.vercel.app/api?words=1&length=${randomLength}`);
            const endResponse = await axios.get(`https://random-word-api.vercel.app/api?words=1&length=${randomLength}`);
    
            startWord = startResponse.data[0];
            endWord = endResponse.data[0];
    
            if (startWord.length <= maxLength && endWord.length <= maxLength) {
                if (await checkIfWordExists(startWord) && await checkIfWordExists(endWord)) {
                    return { start: startWord, end: endWord };
                }
            }
        } catch (error) {
            console.error("Error fetching random words:", error);
        }
        return { start: startWord, end: endWord };
    };

    const checkIfWordExists = async (word) => {
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.title === "No Definitions Found") {
                return false;
            }
            console.error("Error checking word existence:", error);
            return false;
        }
    };

    const isOneLetterDifference = (word1, word2) => {
        if (word1.length !== word2.length) return false;
        let diffCount = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) diffCount++;
            if (diffCount > 1) return false;
        }
        return diffCount === 1;
    };

    return (
        <Container className="game-container">
            <h1>Word Ladder Game</h1>
            <Alert variant="primary">
                {loading ? "Generating Words..." : `Start Word: ${startWord.toUpperCase()}, End Word: ${endWord.toUpperCase()}`}
            </Alert>
            <Form>
                <Form.Group controlId="wordInput">
                    <Form.Control
                        type="text"
                        placeholder="Enter next word"
                        value={inputWord}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button className="mt-2" onClick={handleAddWord}>Add Word</Button>
            </Form>
            <div className="word-history mt-4">
                {wordHistory.map((word, idx) => (
                    <Alert key={idx} variant="success">{word.toUpperCase()}</Alert>
                ))}
            </div>
            <ToastContainer />
        </Container>
    );
}

export default GamePage;