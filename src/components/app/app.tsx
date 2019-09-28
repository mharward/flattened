import React from 'react';
import { Box, Input } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import logo from './logo.svg';
import './app.scss';
import Room from './room-template';
import House from './house';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>

            <DndProvider backend={HTML5Backend}>
                <h2>House</h2>
                <House />
                <h2>Room Palette</h2>
                <Input></Input>
                <Box
                    display="flex"
                    justifyContent="flexStart"
                    className="palette"
                >
                    <Room name="Bathroom" />
                    <Room name="Shared Room" />
                    <Room name="Bedroom" />
                </Box>
            </DndProvider>
        </div>
    );
};

export default App;
