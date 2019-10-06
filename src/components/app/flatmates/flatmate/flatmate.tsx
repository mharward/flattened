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
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
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

const MAX_NAME_LENGHTH = 30;

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
            room =>
                room.occupants.length === 0 ||
                room.occupants.find(occupant => occupant.id === flatmate.id)
        )
        .map(
            room =>
                (room.width * room.height) /
                (room.occupants.length || flatmateCount)
        )
        .reduce((total, roomAreaForOccupant) => total + roomAreaForOccupant, 0);

    const percentage = area > 0 ? flatmateArea / area : 1 / flatmateCount;
    const value = amount * percentage;

    const remove = () => {
        removeFlatmate(flatmate.id);
    };

    const nameChanged = (event: any) => {
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
        flatmate.name.length < 1 || flatmate.name.length > MAX_NAME_LENGHTH;

    const nameKeyDown = (event: any) => {
        if (event.keyCode === 13 || event.keyCode === 27) {
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
            room =>
                (flatmateCount === 1 && room.occupants.length === 0) ||
                (room.occupants.length === 1 &&
                    room.occupants.find(
                        occupant => occupant.id === flatmate.id
                    ))
        )
        .map(room => room.width * room.height)
        .reduce((total, roomArea) => total + roomArea, 0);

    const sharedArea = rooms
        .filter(
            room =>
                (flatmateCount > 1 && room.occupants.length === 0) ||
                (room.occupants.length > 1 &&
                    room.occupants.find(
                        occupant => occupant.id === flatmate.id
                    ))
        )
        .map(room => room.width * room.height)
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
                                ></Input>
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
