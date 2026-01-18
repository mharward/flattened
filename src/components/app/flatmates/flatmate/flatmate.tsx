import React, { useState } from 'react';
import {
    Avatar,
    Box,
    FormControl,
    IconButton,
    Input,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { FlatmateProps, RoomProps } from '../../../../common/entities';
import { calculateRentForFlatmate } from '../../../../common/utilities';

interface FlatmateDetailsProps {
    flatmate: FlatmateProps;
    amount: number;
    area: number;
    rooms: RoomProps[];
    removeFlatmate(flatmateId: string): void;
    updateFlatmateName(flatmateId: string, newName: string): void;
    flatmateCount: number;
}

const MAX_NAME_LENGTH = 30;

const Flatmate: React.FC<FlatmateDetailsProps> = ({
    flatmate,
    amount,
    area,
    rooms,
    removeFlatmate,
    updateFlatmateName,
    flatmateCount,
}) => {
    const rentCalc = calculateRentForFlatmate(
        flatmate,
        rooms,
        area,
        amount,
        flatmateCount
    );

    const remove = () => {
        removeFlatmate(flatmate.id);
    };

    const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFlatmateName(flatmate.id, event.target.value);
    };

    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        if (isNameInvalid) {
            return;
        }
        setEditMode(!editMode);
    };

    const isNameInvalid =
        flatmate.name.length < 1 || flatmate.name.length > MAX_NAME_LENGTH;

    const nameKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            toggleEditMode();
        }
    };

    const nameBlur = () => {
        if (!isNameInvalid) {
            setEditMode(false);
        }
    };

    const percentageOfRent = (rentCalc.percentage * 100).toFixed(1);

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    style={{
                        backgroundColor: flatmate.color,
                    }}
                >
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Box display="flex">
                        {editMode ? (
                            <FormControl error={isNameInvalid}>
                                <Input
                                    value={flatmate.name}
                                    onChange={nameChanged}
                                    onKeyDown={nameKeyDown}
                                    onBlur={nameBlur}
                                    autoFocus
                                />
                            </FormControl>
                        ) : (
                            <Typography variant="h5" noWrap>
                                {flatmate.name}
                            </Typography>
                        )}
                        <IconButton
                            size="small"
                            color="primary"
                            disabled={isNameInvalid}
                            onClick={toggleEditMode}
                        >
                            <CreateIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="h5">
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="h5">
                            ${rentCalc.rentAmount.toFixed(2)}
                        </Typography>
                    </Box>
                }
                secondary={
                    <span>
                        {percentageOfRent}%&nbsp;&bull;
                        Dedicated&nbsp;area:&nbsp;{rentCalc.dedicatedArea}&nbsp;m
                        <sup>2</sup>
                        &nbsp;&bull; Shared&nbsp;area:&nbsp;{rentCalc.sharedArea}
                        &nbsp;m<sup>2</sup>&nbsp;&bull; Total&nbsp;area:&nbsp;
                        {rentCalc.totalArea}&nbsp;m<sup>2</sup>
                    </span>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    color="secondary"
                    onClick={remove}
                    edge="end"
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Flatmate;
