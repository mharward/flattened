import React from 'react';
import { Button, Grid, List, Typography } from '@material-ui/core';
import { FlatmateProps, RoomProps } from '../../../common/entities';
import Flatmate from './flatmate';

interface FlatmatesProps {
    amount: number;
    area: number;
    flatmates: FlatmateProps[];
    addFlatmate(): void;
    removeFlatmate(flatmateId: string): void;
    updateFlatmateName(flatmateId: string, newName: string): void;
    rooms: RoomProps[];
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

    return (
        <Grid container>
            <Grid item container spacing={2} xs={12}>
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
            <Grid item xs={12}>
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
        </Grid>
    );
};

export default Flatmates;
