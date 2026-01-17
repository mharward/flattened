import React from 'react';
import {
    Box,
    FormControl,
    Input,
    InputAdornment,
    Typography,
} from '@mui/material';

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
        <Box display="flex" flexDirection="row">
            <Typography variant="h4" style={{ marginRight: 20, marginTop: 8 }}>
                Rent
            </Typography>
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
        </Box>
    );
};

export default Rent;
