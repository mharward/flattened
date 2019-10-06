import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { RoomProps, FlatmateProps } from '../../common/entities';
import { stringToHslColor } from '../../common/utilities';
import './app.scss';
import House from './house';
import Rent from './rent';
import Flatmates from './flatmates';
import HeartHouse from './heart-house';

let roomId = 1;
let flatmateId = 1;

const createFlatmate = (name?: string): FlatmateProps => {
    const newFlatmateId = flatmateId++;
    const defaultName = 'Flatmate ' + newFlatmateId;

    return {
        id: 'flatmate' + newFlatmateId,
        name: name || defaultName,
        color: stringToHslColor(defaultName, 70, 60),
    };
};

const createNewRoom = (
    name?: string,
    width?: number,
    height?: number,
    flatmates?: FlatmateProps[]
): RoomProps => {
    const newRoomId = roomId++;
    return {
        id: 'room' + newRoomId,
        name: name || 'Room ' + newRoomId,
        occupants: flatmates || [],
        width: width || 3,
        height: height || 3,
    };
};

const defaultFlatmates = [
    createFlatmate('Jane Flatter'),
    createFlatmate('Phil Renter'),
];

const defaultRooms = [
    createNewRoom('Bedroom', 3, 4, defaultFlatmates),
    createNewRoom('Living Area', 4, 4, defaultFlatmates),
    createNewRoom('Bathroom', 3, 2, defaultFlatmates),
];

const twoBedroomsRooms = [
    createNewRoom('Master Bedroom', 5, 4, [defaultFlatmates[0]]),
    createNewRoom('Small Bedroom', 3, 3, [defaultFlatmates[1]]),
    createNewRoom('Living Area', 4, 4, defaultFlatmates),
    createNewRoom('Kitchen', 3, 4, defaultFlatmates),
    createNewRoom('Bathroom', 3, 2, defaultFlatmates),
];

const threeBedroomsFlatmates = [
    ...defaultFlatmates,
    createFlatmate('Eliza Housemate'),
    createFlatmate('John Tenant'),
];

const threeBedroomsRooms = [
    createNewRoom('Master Bedroom', 5, 4, [
        threeBedroomsFlatmates[0],
        threeBedroomsFlatmates[1],
    ]),
    createNewRoom('Ensuite', 3, 2, [
        threeBedroomsFlatmates[0],
        threeBedroomsFlatmates[1],
    ]),
    createNewRoom('Bedroom', 4, 4, [threeBedroomsFlatmates[2]]),
    createNewRoom('Small Bedroom', 3, 3, [threeBedroomsFlatmates[3]]),
    createNewRoom('Living Area', 5, 4, threeBedroomsFlatmates),
    createNewRoom('Kitchen', 3, 4, threeBedroomsFlatmates),
    createNewRoom('Bathroom', 3, 2, threeBedroomsFlatmates),
];

const manyBedroomsFlatmates = [
    ...threeBedroomsFlatmates,
    createFlatmate('Rachel Roommate'),
    createFlatmate('Paul Tenant'),
];

const manyBedroomsRooms = [
    createNewRoom('Master Bedroom', 5, 4, [
        manyBedroomsFlatmates[0],
        manyBedroomsFlatmates[1],
    ]),
    createNewRoom('Master Ensuite', 3, 2, [
        manyBedroomsFlatmates[0],
        manyBedroomsFlatmates[1],
    ]),
    createNewRoom('Bedroom', 4, 4, [manyBedroomsFlatmates[2]]),
    createNewRoom('Small Bedroom', 3, 3, [manyBedroomsFlatmates[4]]),
    createNewRoom('Living Area', 5, 5, manyBedroomsFlatmates),
    createNewRoom('Kitchen', 4, 4, manyBedroomsFlatmates),
    createNewRoom('Bathroom', 3, 2, [
        manyBedroomsFlatmates[0],
        manyBedroomsFlatmates[1],
        manyBedroomsFlatmates[2],
        manyBedroomsFlatmates[4],
    ]),
    createNewRoom('Sleepout Bedroom', 3, 3, [
        manyBedroomsFlatmates[3],
        manyBedroomsFlatmates[5],
    ]),
    createNewRoom('Sleepout Bathroom', 3, 2, [
        manyBedroomsFlatmates[3],
        manyBedroomsFlatmates[5],
    ]),
    createNewRoom('Sleepout Living', 3, 3, [
        manyBedroomsFlatmates[3],
        manyBedroomsFlatmates[5],
    ]),
];

const App: React.FC = () => {
    const [amount, setAmount] = useState('220');
    const [flatmates, setFlatmates] = useState<FlatmateProps[]>(
        defaultFlatmates
    );
    const [rooms, setRooms] = useState<RoomProps[]>(defaultRooms);

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
        const newFlatmate = createFlatmate();
        addFlatmates([newFlatmate], false);
    };

    const addFlatmates = (
        flatmatesToAdd: FlatmateProps[],
        replaceAll?: boolean
    ) => {
        const newFlatmates = replaceAll
            ? flatmatesToAdd
            : cloneDeep(flatmates).concat(flatmatesToAdd);
        setFlatmates(newFlatmates);

        const newRooms = cloneDeep(rooms);
        newRooms.forEach(room => {
            if (replaceAll) {
                room.occupants = [];
            }
            // If room is already shared, e.g. contains all flatmates, then add flatmates to room
            if (
                room.occupants.length ===
                newFlatmates.length - flatmatesToAdd.length
            ) {
                room.occupants = room.occupants.concat(flatmatesToAdd);
            }
        });
        if (newRooms.length > 0) {
            setRooms(newRooms);
        }
    };

    const addRoom = () => {
        const newRoom = createNewRoom();
        newRoom.occupants = cloneDeep(flatmates);
        addRooms([newRoom], false);
    };

    const addRooms = (roomsToAdd: RoomProps[], replaceAll?: boolean) => {
        const newRooms = replaceAll
            ? roomsToAdd
            : cloneDeep(rooms).concat(roomsToAdd);
        setRooms(newRooms);
    };

    const updateRoom = (item: RoomProps) => {
        if (!item) return;
        const newRooms = cloneDeep(rooms);
        const index = newRooms.findIndex(room => room.id === item.id);
        newRooms[index] = item;
        setRooms(newRooms);
    };

    const removeRoom = (item: RoomProps) => {
        const newRooms = cloneDeep(rooms).filter(room => room.id !== item.id);
        setRooms(newRooms);
    };

    const area: number = rooms
        .map(room => room.height * room.width)
        .reduce((total, value) => total + value, 0);

    const amountValue: number = parseFloat(amount) || 0;

    const updateAllState = (
        amount: string,
        flatmates: FlatmateProps[],
        rooms: RoomProps[]
    ) => {
        roomId = rooms.length + 1;
        flatmateId = flatmates.length + 1;
        setAmount(amount);
        addFlatmates(flatmates, true);
        addRooms(rooms, true);
    };

    const clearAll = () => {
        updateAllState('100', [], []);
    };

    // Examples

    const oneBedroom = () =>
        updateAllState('220', defaultFlatmates, defaultRooms);
    const twoBedrooms = () =>
        updateAllState('350', defaultFlatmates, twoBedroomsRooms);
    const threeBedrooms = () =>
        updateAllState('420', threeBedroomsFlatmates, threeBedroomsRooms);
    const manyBedrooms = () =>
        updateAllState('540', manyBedroomsFlatmates, manyBedroomsRooms);

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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>
                                Are you flatting? One challenge for would-be
                                flatmates is how to split the rent. This
                                calculator uses a simple model of your flat and
                                flatmates to figure out an equitable solution.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Rent amount={amount} amountChange={setAmount} />
                        </Grid>
                        <Grid item xs={12}>
                            <House
                                area={area}
                                rooms={rooms}
                                addRoom={addRoom}
                                updateRoom={updateRoom}
                                removeRoom={removeRoom}
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
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={clearAll}
                            >
                                Clear All
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                How It Works
                            </Typography>
                            <Typography gutterBottom>
                                For each room, its value is calculated based on
                                its relative area to the rest of the flat. Then
                                each occupant is assigned their proportion of
                                this value. Finally, for each flatmate, the
                                proportion of values across all of the rooms
                                they use is then added.
                            </Typography>
                            <Typography>
                                This calculator doesn't account for relative
                                differences in the value or amount of usage of a
                                room, outside spaces, or any special
                                dispensations given to particular flatmates.
                                However, in the majority of cases this
                                calculator provides a good model for giving an
                                equitable cost per flatmate.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4">Examples</Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                padding={3}
                            >
                                <Button
                                    className="example-button"
                                    variant="outlined"
                                    color="primary"
                                    onClick={oneBedroom}
                                >
                                    1 Bedroom with Couple
                                </Button>
                                <Button
                                    className="example-button"
                                    variant="outlined"
                                    color="primary"
                                    onClick={twoBedrooms}
                                >
                                    2 Bedrooms of Different Sizes
                                </Button>
                                <Button
                                    className="example-button"
                                    variant="outlined"
                                    color="primary"
                                    onClick={threeBedrooms}
                                >
                                    3 Bedrooms with Couple
                                </Button>
                                <Button
                                    className="example-button"
                                    variant="outlined"
                                    color="primary"
                                    onClick={manyBedrooms}
                                >
                                    Large Flat with Many Spaces
                                </Button>
                            </Box>
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
