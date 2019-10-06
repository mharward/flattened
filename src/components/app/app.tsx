import React, { useState } from 'react';
import './app.scss';
import House from './house';
import Rent from './rent';
import Flatmates from './flatmates';
import { cloneDeep } from 'lodash';
import {
    AppBar,
    Container,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
} from '@material-ui/core';
import HeartHouse from './heart-house';

let roomId = 1;
let flatmateId = 3;

const App: React.FC = () => {
    const [amount, setAmount] = useState('220');

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

    const updateFlatmateName = (flatmateId: string, newName: string): void => {
        const newFlatmates = cloneDeep(flatmates);
        const flatmate = newFlatmates.find(
            flatmate => flatmate.id === flatmateId
        );
        if (flatmate) {
            flatmate.name = newName;
            setFlatmates(newFlatmates);
        }

        const newRooms = cloneDeep(rooms);
        newRooms.forEach(room => {
            const occupant = room.occupants.find(
                occupant => occupant.id === flatmateId
            );
            if (occupant) {
                occupant.name = newName;
            }
        });
        setRooms(newRooms);
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

        const newRooms = cloneDeep(rooms);
        newRooms.forEach(room => {
            // If room is already shared, e.g. contains all flatmates, then add flatmate to room
            if (room.occupants.length === newFlatmates.length - 1) {
                room.occupants.push(newFlatmate);
            }
        });
        setRooms(newRooms);
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

    const amountValue = parseFloat(amount) || 0;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className="app-header">
                <Container maxWidth="md">
                    <Toolbar disableGutters>
                        <HeartHouse style={{ marginRight: '20px' }} />
                        <Typography
                            component="h1"
                            variant="h5"
                            color="inherit"
                            noWrap
                        >
                            Cost My Flat
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <main className="app-main">
                <Container className="app-container" maxWidth="md">
                    <Grid container spacing={9}>
                        <Grid item xs={12}>
                            <Rent amount={amount} amountChange={setAmount} />
                        </Grid>
                        <Grid item xs={12}>
                            <House
                                area={area}
                                rooms={rooms}
                                setRooms={setRooms}
                                createNewRoom={createNewRoom}
                                flatmates={flatmates}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Flatmates
                                amount={amountValue}
                                area={area}
                                rooms={rooms}
                                flatmates={flatmates}
                                addFlatmate={addFlatmate}
                                updateFlatmateName={updateFlatmateName}
                                removeFlatmate={removeFlatmate}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer className="app-footer">
                <Container className="app-footer-container" maxWidth="md">
                    <Grid container spacing={9}>
                        <Grid item xs={12}>
                            <Typography>
                                Made by Matthew Harward &copy; 2019 -{' '}
                                {new Date().getFullYear()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default App;
