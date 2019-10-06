import React, { useState } from 'react';
import {
    Button,
    Fade,
    Grid,
    IconButton,
    Paper,
    Popover,
    Typography,
} from '@material-ui/core';
import { cloneDeep } from 'lodash';
import './house.scss';
import Room from './room';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

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

    const [anchorEl, setAnchorEl] = useState(null);

    const showPopover = (event: any) => {
        setAnchorEl(!!anchorEl ? null : event.currentTarget);
    };

    const popoverOpen = Boolean(anchorEl);
    const popoverId = popoverOpen ? 'simple-popper' : undefined;

    return (
        <Grid>
            <Grid container spacing={2}>
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
                <Grid item>
                    <IconButton
                        color="primary"
                        onClick={showPopover}
                        aria-describedby={popoverId}
                    >
                        <HelpOutlineIcon></HelpOutlineIcon>
                    </IconButton>
                    <Popover
                        onClose={showPopover}
                        id={popoverId}
                        anchorEl={anchorEl}
                        open={popoverOpen}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Paper style={{padding: 10, maxWidth: 500}}>
                            <Typography variant="h6">Flat Layout</Typography>
                            This section represents a view of your flat. Add new
                            rooms to represent spaces within your flat. Edit
                            them to change their area and to specify who uses
                            the room.
                        </Paper>
                    </Popover>
                </Grid>
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
