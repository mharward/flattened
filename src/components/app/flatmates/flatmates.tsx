import React from 'react';
import { Button, Grid, List, Typography } from '@mui/material';
import { FlatmateProps, RoomProps } from '../../../common/entities';
import Help from '../../../common/help';
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
                <Grid item>
                    <Help>
                        <Typography variant="h6">Flatmates</Typography>
                        This section provides a list of the flatmates. Add and
                        name new flatmates to show who lives in the flat. Each
                        flatmate has an amount of the rent calculated for them.
                        This is dynamically updated so will always be up to
                        date. Additional details about the percentage of the
                        rent and area they occupy in the flat is also provided.
                    </Help>
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
