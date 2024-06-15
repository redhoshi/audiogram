import React, { useState } from 'react';
import { Button, ButtonGroup, Stack, VStack, Card, CardBody, Text, HStack } from '@chakra-ui/react'
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { FaCircleQuestion } from "react-icons/fa6";

const questions = [
    "Can you listen this tone?",
    "Is water wet?",
    "Is fire hot?",
    "Is ice cold?",
    "Is the earth round?"
];

function Question({ question, onAnswer }) {
    return (
        <div>
            <VStack spacing={10}>
                <Card>
                    <CardBody>
                        <HStack direction='row' spacing={5}>
                    <FaCircleQuestion size = '1.4rem' />
                        <Text>{question}</Text>
                        </HStack>
                    </CardBody>
                </Card>
                <HStack spacing={4} justify="center">
                    <Button colorScheme="green" size='lg' onClick={() => onAnswer('Yes')}>Yes</Button>
                    <Button colorScheme="red" size='lg' onClick={() => onAnswer('No')}>No</Button>
                </HStack>
            </VStack>
        </div>
    );
}

function QuestionPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [yesCount, setYesCount] = useState(0);
    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
        if (answer === 'Yes') {
            setYesCount(yesCount + 1);
            console.log(`Yes count: ${yesCount + 1}`);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("You have completed the quiz!");
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            {currentQuestionIndex < questions.length ? (

                <Question
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                />
            ) : (
                <div>
                    <h2>Thank you for completing the quiz!</h2>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index}>
                                {question} - {answers[index]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default QuestionPage;
