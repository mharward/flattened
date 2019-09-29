import React, { useState } from 'react';
import './app.scss';
import House from './house';
import Rent from './rent';
import Flatmates from './flatmates';
import { cloneDeep } from 'lodash';
import { Typography } from '@material-ui/core';

let roomId = 1;
let flatmateId = 3;

const App: React.FC = () => {
    const [amount, setAmount] = useState(220.0);

    function hashCode(str: string): number {
        return str
            .split('')
            .reduce(
                (prevHash, currVal) =>
                    ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
                0
            );
    }

    function stringToHslColor(str: string, s: number, l: number): string {
        const hash = hashCode(str);

        const h = (hash * 1000) % 360;
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    const createFlatmate = (newFlatmateId: number) => {
        const name = 'Flatmate ' + newFlatmateId;

        return {
            id: 'flatmate' + newFlatmateId,
            name: name,
            color: stringToHslColor(name, 70, 60),
        };
    };

    const removeFlatmate = (flatmateId: string) => {
        const newFlatmates = cloneDeep(flatmates).filter(
            flatmate => flatmate.id !== flatmateId
        );
        setFlatmates(newFlatmates);

        const newRooms = cloneDeep(rooms);
        newRooms.forEach(
            room =>
                (room.occupants = room.occupants.filter(
                    occupant => occupant.id !== flatmateId
                ))
        );
        setRooms(newRooms);
    };

    const addFlatmate = (): void => {
        const newFlatmate = createFlatmate(flatmateId++);
        const newFlatmates: any = cloneDeep(flatmates);
        newFlatmates.push(newFlatmate);
        setFlatmates(newFlatmates);
    };

    const [flatmates, setFlatmates] = useState([
        createFlatmate(1),
        createFlatmate(2),
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

    const [rooms, setRooms] = useState([createNewRoom('Bedroom')]);

    const area = rooms
        .map(room => room.height * room.width)
        .reduce((total, value) => total + value, 0);

    return (
        <div className="app">
            <Typography variant="h1">Flattened</Typography>
            <Rent amount={amount} amountChange={setAmount} />
            <House
                area={area}
                rooms={rooms}
                setRooms={setRooms}
                createNewRoom={createNewRoom}
            />
            <Flatmates
                amount={amount}
                area={area}
                rooms={rooms}
                flatmates={flatmates}
                addFlatmate={addFlatmate}
                removeFlatmate={removeFlatmate}
            />
        </div>
    );
};

export default App;
