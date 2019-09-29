import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './app.scss';
import Room from './room-template';
import House from './house';
import Rent from './rent';
import Calculation from './calculation';

let roomId = 0;
let flatmateId = 0;

const App: React.FC = () => {
    const [amount, setAmount] = useState(220.0);

    const createFlatmate = (name: string) => {
        return {
            id: 'flatmate' + flatmateId++,
            name: name,
            color: '#446699',
        };
    };

    const [flatmates] = useState([
        createFlatmate('Peter Smith'),
        createFlatmate('James Shaw'),
    ]);

    const createNewRoom = (name: string) => {
        return {
            id: 'room' + roomId++,
            name: name,
            occupants: flatmates,
            width: 3,
            height: 3,
        };
    };

    const [rooms, setRooms] = useState([createNewRoom('Initial Room')]);

    return (
        <div className="app">
            <DndProvider backend={HTML5Backend}>
                <Rent amount={amount} amountChange={setAmount} />
                <h2>House</h2>
                <House
                    rooms={rooms}
                    setRooms={setRooms}
                    createNewRoom={createNewRoom}
                />
                <h2>Room Palette</h2>

                <Box
                    display="flex"
                    justifyContent="flexStart"
                    className="palette"
                >
                    <Room name="Bathroom" />
                    <Room name="Shared Room" />
                    <Room name="Bedroom" />
                </Box>
                <Calculation
                    amount={amount}
                    rooms={rooms}
                    flatmates={flatmates}
                />
            </DndProvider>
        </div>
    );
};

export default App;
