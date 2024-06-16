import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Stack, VStack, Card, CardBody, Text, HStack } from '@chakra-ui/react'
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { FaCircleQuestion } from "react-icons/fa6";
import { play_tone, init } from '../js/sound'

const questions = [
    "Are you ready to start?",
    "Can you listen this tone?",
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
                            <FaCircleQuestion size='1.4rem' />
                            <Text>{question}</Text>
                        </HStack>
                    </CardBody>
                </Card>
                <HStack spacing={4} justify="center">
                    <Button bg="#E63946" color="white" size='lg' onClick={() => onAnswer('Yes')}>Yes</Button>
                    <Button bg="#1D3557" color="white" size='lg' onClick={() => onAnswer('No')}>No</Button>
                </HStack>
            </VStack>
        </div>
    );
}

function QuestionPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [yesCount, setYesCount] = useState(0);

    useEffect(() => {
        if (currentQuestionIndex >= 1) {
            var amp = -20;
            var aud_ctx, buffer;
            [aud_ctx, buffer] = play_tone(400, amp);
            let source;
            source = aud_ctx.createBufferSource();
            source.buffer = buffer;             //Set the buffer in the AudioBufferSourceNode
            source.connect(aud_ctx.destination); //Connect the AudioBufferSourceNode to the destination so we can hear the sound
            source.start();
            console.log('run', currentQuestionIndex)
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
    }, []);


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
