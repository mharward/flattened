import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
} from '@mui/material';
import { RoomProps, FlatmateProps } from '../../common/entities';
import {
    usePersistentState,
    createFlatmate,
    createNewRoom,
    buildDefaultFlatmates,
    buildDefaultRooms,
    buildTwoBedroomsRooms,
    buildThreeBedroomsData,
    buildManyBedroomsData,
} from '../../common/utilities';
import './app.scss';
import House from './house';
import Rent from './rent';
import Flatmates from './flatmates';
import HeartHouse from './heart-house';

const initialFlatmates = buildDefaultFlatmates();
const initialRooms = buildDefaultRooms(initialFlatmates);

const App: React.FC = () => {
    const [amount, setAmount] = usePersistentState('amount', '220');

    const [flatmates, setFlatmates] = usePersistentState(
        'flatmates',
        initialFlatmates
    );

    const [rooms, setRooms] = usePersistentState('rooms', initialRooms);

    const updateFlatmateName = (flatmateId: string, newName: string): void => {
        setFlatmates(
            flatmates.map((f) =>
                f.id === flatmateId ? { ...f, name: newName } : f
            )
        );
    };

    const removeFlatmate = (flatmateId: string) => {
        setFlatmates(flatmates.filter((f) => f.id !== flatmateId));
        setRooms(
            rooms.map((room) => ({
                ...room,
                occupantIds: room.occupantIds.filter((id) => id !== flatmateId),
            }))
        );
    };

    const addFlatmate = (): void => {
        const newFlatmate = createFlatmate(flatmates);
        const newFlatmates = [...flatmates, newFlatmate];
        setFlatmates(newFlatmates);

        // Add new flatmate to shared rooms (rooms that had all previous flatmates)
        setRooms(
            rooms.map((room) => {
                if (room.occupantIds.length === flatmates.length) {
                    return {
                        ...room,
                        occupantIds: [...room.occupantIds, newFlatmate.id],
                    };
                }
                return room;
            })
        );
    };

    const addRoom = () => {
        const allFlatmateIds = flatmates.map((f) => f.id);
        const newRoom = createNewRoom(rooms, undefined, undefined, undefined, allFlatmateIds);
        setRooms([...rooms, newRoom]);
    };

    const updateRoom = (updatedRoom: RoomProps) => {
        if (!updatedRoom) return;
        setRooms(
            rooms.map((room) =>
                room.id === updatedRoom.id ? updatedRoom : room
            )
        );
    };

    const removeRoom = (roomToRemove: RoomProps) => {
        setRooms(rooms.filter((room) => room.id !== roomToRemove.id));
    };

    const area: number = rooms
        .map((room) => room.height * room.width)
        .reduce((total, value) => total + value, 0);

    const amountValue: number = parseFloat(amount) || 0;

    const updateAllState = (
        newAmount: string,
        newFlatmates: FlatmateProps[],
        newRooms: RoomProps[]
    ) => {
        setAmount(newAmount);
        setFlatmates(newFlatmates);
        setRooms(newRooms);
    };

    const clearAll = () => {
        updateAllState('100', [], []);
    };

    // Examples
    const oneBedroom = () => {
        const f = buildDefaultFlatmates();
        updateAllState('220', f, buildDefaultRooms(f));
    };

    const twoBedrooms = () => {
        const f = buildDefaultFlatmates();
        updateAllState('350', f, buildTwoBedroomsRooms(f));
    };

    const threeBedrooms = () => {
        const data = buildThreeBedroomsData();
        updateAllState('420', data.flatmates, data.rooms);
    };

    const manyBedrooms = () => {
        const data = buildManyBedroomsData();
        updateAllState('540', data.flatmates, data.rooms);
    };

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
