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
    const flatmateArea = rooms
        .filter(
            (room) =>
                room.occupantIds.length === 0 ||
                room.occupantIds.includes(flatmate.id)
        )
        .map(
            (room) =>
                (room.width * room.height) /
                (room.occupantIds.length || flatmateCount)
        )
        .reduce((total, roomAreaForOccupant) => total + roomAreaForOccupant, 0);

    const percentage = area > 0 ? flatmateArea / area : 1 / flatmateCount;
    const value = amount * percentage;

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

    const percentageOfRent = (percentage * 100).toFixed(1);

    const dedicatedArea = rooms
        .filter(
            (room) =>
                (flatmateCount === 1 && room.occupantIds.length === 0) ||
                (room.occupantIds.length === 1 &&
                    room.occupantIds.includes(flatmate.id))
        )
        .map((room) => room.width * room.height)
        .reduce((total, roomArea) => total + roomArea, 0);

    const sharedArea = rooms
        .filter(
            (room) =>
                (flatmateCount > 1 && room.occupantIds.length === 0) ||
                (room.occupantIds.length > 1 &&
                    room.occupantIds.includes(flatmate.id))
        )
        .map((room) => room.width * room.height)
        .reduce((total, roomArea) => total + roomArea, 0);

    const totalArea = dedicatedArea + sharedArea;

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
                            ${value.toFixed(2)}
                        </Typography>
                    </Box>
                }
                secondary={
                    <span>
                        {percentageOfRent}%&nbsp;&bull;
                        Dedicated&nbsp;area:&nbsp;{dedicatedArea}&nbsp;m
                        <sup>2</sup>
                        &nbsp;&bull; Shared&nbsp;area:&nbsp;{sharedArea}
                        &nbsp;m<sup>2</sup>&nbsp;&bull; Total&nbsp;area:&nbsp;
                        {totalArea}&nbsp;m<sup>2</sup>
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
