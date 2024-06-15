////////////////
/// Home
////////////////


import logo from '../logo.svg';
import '../App.css';
import { useLocation } from 'react-router-dom';
import { ChakraProvider, VStack} from '@chakra-ui/react';
import Simple from '../Pages/Nav';
import React from 'react';
import ReactDOM from 'react-dom';
import Question from './Question';
import Audiogram from './Audiogram';

function Home() {

  const location = useLocation();
  const {useID, login, adjust} = location.state || {};

  return (
    <div className="App">
      <ChakraProvider>
        <Simple/>
        <VStack spacing={5}>
        <Audiogram/>
        <Question/>
        </VStack>
      </ChakraProvider>
    </div>
  );
}

export default Home;
