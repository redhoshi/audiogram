import { VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {Box, HStack, Button, Stack} from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const VolumeBar = () => {

  const navigate = useNavigate();
  const [volume, setVolume] = useState(0);
  const maxBars = 10;

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
  };

  const onClickPage1 = (link) => {
    var userID = generateRandomId();
    console.log(UserData);
    const UserData = {
      userID : userID,
      adjust : true,
    };
    console.log(UserData);
    navigate(link,{state:UserData});
  };

  useEffect(() => {
    const getMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(256, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const average = array.reduce((a, b) => a + b) / array.length;
          const newVolume = Math.min(maxBars, Math.max(0, Math.floor((average / 256) * maxBars)));
          setVolume(newVolume);
        };
      } catch (err) {
        console.error(err);
      }
    };

    getMicrophoneAccess();

    return () => {
      // Cleanup code to stop the microphone and audio context
    };
  }, 
  
  []);

  const getBarColor = (index) => {
    if (index < volume) {
      return 'blue';
    }
    return 'black';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {Array.from({ length: maxBars }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '40px',
              height: '100px',
              backgroundColor: getBarColor(index),
            }}
          />
        ))}
      </div>
      <HStack spacing="200">
        <Box>Quiet</Box>
        <Box>Okay</Box>
        <Box>Loud</Box>
      </HStack>
      <Box p={8}></Box>
      <Button colorScheme='blue' variant='solid' size='lg' onClick={()=>{onClickPage1('/audiogram')}}>
        Let's Start!
      </Button>
    </div>
  );
};

export default VolumeBar;
