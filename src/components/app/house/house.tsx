import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { FlatmateProps, RoomProps } from '../../../common/entities';

import Room from './room';
import Help from '../../../common/help';

interface HouseProps {
    area: number;
    rooms: RoomProps[];
    addRoom(): void;
    updateRoom(room: RoomProps): void;
    removeRoom(room: RoomProps): void;
    flatmates: FlatmateProps[];
}

const MAX_NUMBER_ROOMS = 20;

const House: React.FC<HouseProps> = ({
    area,
    rooms,
    addRoom,
    updateRoom,
    removeRoom,
    flatmates,
}) => {
    const maxRoomsReached = rooms.length >= MAX_NUMBER_ROOMS;

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
                        onClick={addRoom}
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
                    <Help>
                        <Typography variant="h6">Flat Layout</Typography>
                        This section represents a view of your flat. Add new
                        rooms to represent spaces within your flat. Edit them to
                        change their area and to specify who uses the room.
                    </Help>
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
