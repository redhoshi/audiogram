import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  VStack,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { MdVolumeUp } from 'react-icons/md';
import { play_tone, init } from '../js/sound';

var amp = -20;

function Audiogram() {
  const frequencies = [125, 250, 500, 1000, 2000, 4000, 8000];
  const marks = [-120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100];
  const real_marks = [120, 100, 80, 60, 40, 20, 0, -20, -40, -60, -80, -100];
  
  // State to hold the slider values for each frequency
  const [sliderValues, setSliderValues] = useState(
    frequencies.reduce((acc, frequency) => {
      acc[frequency] = 50;
      //
      return acc;
    }, {})
  );
  //const [sliderValue, setSliderValue] = useState(50)

  const handleSliderChange = (frequency, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [frequency]: value,
    }));
  };

  return (
    <ChakraProvider>
      <Box p={4} maxWidth="1200px" mx="auto">
        <VStack spacing={2} align="center" p={0}>
          {/*<Text fontSize="2xl" fontWeight="bold">Audiogram</Text>*/}
          <HStack spacing={['0%', '6%', '16%']} align="flex-start" justify="center" width="100%">
            {frequencies.map((frequency) => (
              <VStack key={frequency} align="center" width={['90%', '45%', '30%']}>
                <Text>{frequency} Hz</Text>
                <IconButton
                  aria-label={`Play sound ${frequency} Hz`}
                  icon={<MdVolumeUp />}
                  onClick={() => {
                    var aud_ctx, buffer;
                    [aud_ctx, buffer] = play_tone(400, amp);
                    let source;
                    source = aud_ctx.createBufferSource();
                    source.buffer = buffer;             //Set the buffer in the AudioBufferSourceNode
                    source.connect(aud_ctx.destination); //Connect the AudioBufferSourceNode to the destination so we can hear the sound
                    source.start();
                    console.log(frequency);
                  }}
                  variant="ghost"
                  colorScheme="blue"
                  size="md"
                />
                <Box sx={{ m: 3 }} />
                <Box position="relative" height="250px">
                  <Slider
                    value={sliderValues[frequency]}
                    min={-120}
                    max={100}
                    step={1}
                    orientation="vertical"
                    height="500px"
                    width="100%"
                    onChange={(value) => handleSliderChange(frequency, value)}
                  >
                    {/* Render marks for the current frequency */}
                    {marks.map((mark, index) => (
                      <SliderMark
                        key={mark}
                        value={mark}
                        ml={-10}
                        fontSize="xs"
                        zIndex={1} // Ensure marks are above the line
                      >
                        {real_marks[index]}
                      </SliderMark>
                    ))}
                    {/* Slider track and thumb */}
                    <SliderTrack>
                      {/* Customized filled track with a horizontal line */}
                      <SliderFilledTrack
                        bg="black"
                        height="2px"
                        borderRadius="full"
                        zIndex={0} // Ensure line is behind marks
                      />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {/* Display the current value of the slider */}
                  <Text mt={2} textAlign="center">{sliderValues[frequency]}</Text>

                </Box>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Audiogram;
