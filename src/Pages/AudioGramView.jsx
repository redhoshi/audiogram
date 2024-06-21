import React from 'react';
import {
    ChakraProvider,
} from "@chakra-ui/react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SliderView from './SliderView'

function AudioGramView() {

    return (

        <ChakraProvider>
            <Tabs>
                <TabList>
                    <Tab>Left</Tab>
                    <Tab>Right</Tab>
                </TabList>
                <TabPanel>
                    <SliderView />
                </TabPanel>
                <TabPanel>
                    <SliderView />
                </TabPanel>
            </Tabs>
        </ChakraProvider>
    )
}

export default AudioGramView;