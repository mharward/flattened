import React from 'react';
import {
    FormControl,
    Grid,
    Input,
    InputAdornment,
    Typography,
} from '@material-ui/core';
import './rent.scss';

interface RentProps {
    amount: string;
    amountChange(newValue: string): void;
}

const MIN_RENT = 1;
const MAX_RENT = 1000000;

const Rent: React.FC<RentProps> = ({ amount, amountChange }) => {
    // TODO: support multiple currencies, presetting based on location, default to $
    // TODO: set default rent based on the average for a country

    const rentIsInvalid =
        isNaN(parseFloat(amount)) ||
        parseFloat(amount) < MIN_RENT ||
        parseFloat(amount) > MAX_RENT;

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
                <FormControl error={rentIsInvalid}>
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
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Rent;
