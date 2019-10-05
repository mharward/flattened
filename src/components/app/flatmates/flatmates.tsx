import React from 'react';
import { Button, Grid, List, Typography } from '@material-ui/core';
import Flatmate from './flatmate';
import './flatmates.scss';

interface FlatmatesProps {
    amount: number;
    area: number;
    flatmates: FlatmateProps[];
    addFlatmate(): void;
    removeFlatmate(flatmateId: string): void;
    updateFlatmateName(flatmateId: string, newName: string): void;
    rooms: RoomProps[];
}

interface FlatmateProps {
    id: string;
    name: string;
    color: string;
}

interface RoomProps {
    name: string;
    width: number;
    height: number;
    occupants: FlatmateProps[];
}

interface FlatmateSummary {
    percentage: number;
    value: number;
}

const MAX_FLATMATES_REACHED = 20;

const Flatmates: React.FC<FlatmatesProps> = ({
    amount,
    area,
    flatmates,
    addFlatmate,
    removeFlatmate,
    updateFlatmateName,
    rooms,
}) => {
    const maxFlatmatesReached = flatmates.length >= MAX_FLATMATES_REACHED;

    // TODO: sort flatmates by name descending, name ascending, amount descending, amount ascending
    // TODO: show area of dedicated space and area of of shared space

    return (
        <Grid>
            <Grid container spacing={3}>
                <Grid item>
                    <Typography variant="h4" component="h2">
                        Flatmates
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={maxFlatmatesReached}
                        onClick={addFlatmate}
                    >
                        Add Flatmate
                    </Button>
                </Grid>
                <Grid item>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        style={{ lineHeight: 2.5 }}
                    >
                        Total flatmates: {flatmates.length}
                    </Typography>
                </Grid>
            </Grid>
            <List>
                {flatmates.map(item => (
                    <Flatmate
                        flatmate={item}
                        amount={amount}
                        area={area}
                        rooms={rooms}
                        removeFlatmate={removeFlatmate}
                        updateFlatmateName={updateFlatmateName}
                        flatmateCount={flatmates.length}
                        key={item.id}
                    ></Flatmate>
                ))}
            </List>
        </Grid>
    );
};

export default Flatmates;
