import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import './house.scss';
import Room from './room';

interface HouseProps {
    area: number;
    rooms: any[];
    setRooms(rooms: any[]): void;
    createNewRoom(name: string): any;
    flatmates: any[];
}

interface RoomObject {
    id: string;
    name: string;
    width: number;
    height: number;
    occupants: any[];
}

const MAX_NUMBER_ROOMS = 20;

const House: React.FC<HouseProps> = ({
    area,
    rooms,
    setRooms,
    createNewRoom,
    flatmates,
}) => {
    const maxRoomsReached = rooms.length >= MAX_NUMBER_ROOMS;

    const addRoom = (item: RoomObject) => {
        if (!item) return;
        const newRooms = cloneDeep(rooms);
        newRooms.push(item);
        setRooms(newRooms);
    };

    const updateRoom = (item: RoomObject) => {
        if (!item) return;
        const newRooms = cloneDeep(rooms);
        const index = newRooms.findIndex(room => room.id === item.id);
        newRooms[index] = item;
        setRooms(newRooms);
    };

    const removeRoom = (item: RoomObject) => {
        const newRooms = cloneDeep(rooms).filter(room => room.id !== item.id);
        setRooms(newRooms);
    };

    return (
        <Grid container spacing={3}>
            <Grid item>
                <Typography variant="h4" component="h2">
                    Flat Layout
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={maxRoomsReached}
                    onClick={() => addRoom(createNewRoom('New Room'))}
                >
                    Add Room
                </Button>
            </Grid>
            <Grid item>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    style={{ lineHeight: 2.5 }}
                >
                    Total area: {area} m <sup>2</sup>
                </Typography>
            </Grid>
            <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                {rooms.map(item => (
                    <Grid key={item.id} item>
                        <Room
                            room={item}
                            updateRoom={updateRoom}
                            remove={() => removeRoom(item)}
                            flatmates={flatmates}
                        ></Room>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default House;
