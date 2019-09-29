import React from 'react';
import { Grid, Input, InputAdornment, Typography } from '@material-ui/core';
import './rent.scss';

interface RentProps {
    amount: string;
    amountChange(newValue: string): void;
}

const Rent: React.FC<RentProps> = ({ amount, amountChange }) => {
    const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value;
        amountChange(newAmount);
    };

    return (
        <Grid container justify="flex-start" spacing={3} alignItems="center">
            <Grid item>
                <Typography variant="h4">Rent</Typography>
            </Grid>
            <Grid item>
                <Input
                    type="number"
                    value={amount}
                    onChange={onAmountChange}
                    style={{ fontSize: '2.5em' }}
                    startAdornment={
                        <InputAdornment position="start">
                            <Typography variant="h4">$</Typography>
                        </InputAdornment>
                    }
                ></Input>
            </Grid>
        </Grid>
    );
};

export default Rent;
