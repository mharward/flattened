import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './calculation.scss';

interface CalculationProps {
    amount: number;
    flatmates: FlatmateProps[];
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

const Calculation: React.FC<CalculationProps> = ({
    amount,
    flatmates,
    rooms,
}) => {
    const volume = rooms
        .map(room => room.height * room.width)
        .reduce((total, value) => total + value);

    const flatmateVolume = (flatmate: FlatmateProps): number => {
        return rooms
            .filter(room =>
                room.occupants.find(occupant => occupant.id === flatmate.id)
            )
            .map(room => (room.width * room.height) / room.occupants.length)
            .reduce(
                (total, roomVolumeForOccupant) => total + roomVolumeForOccupant
            );
    };

    const summary = (flatmate: FlatmateProps): FlatmateSummary => {
        const percentage = flatmateVolume(flatmate) / volume;
        const value = amount * percentage;
        return { percentage, value };
    };

    return (
        <Grid>
            <Typography>
                Total volume: {volume} m<sup>2</sup>
            </Typography>
            <Typography>Amount per Flatmate</Typography>
            {flatmates.map((item, index) => (
                <div key={item.id}>
                    {item.name}: {summary(item).value}
                </div>
            ))}
        </Grid>
    );
};

export default Calculation;
