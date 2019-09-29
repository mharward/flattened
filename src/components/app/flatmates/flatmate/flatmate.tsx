import React from 'react';
import {
    Avatar,
    Box,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import './flatmate.scss';

interface FlatmateDetailsProps {
    flatmate: FlatmateProps;
    amount: number;
    area: number;
    rooms: RoomProps[];
    removeFlatmate(flatmateId: string): void;
    flatmateCount: number;
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

const Flatmate: React.FC<FlatmateDetailsProps> = ({
    flatmate,
    amount,
    area,
    rooms,
    removeFlatmate,
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
        .reduce(
            (total, roomVolumeForOccupant) => total + roomVolumeForOccupant,
            0
        );

    const percentage = area > 0 ? flatmateArea / area : 1 / flatmateCount;
    const value = amount * percentage;

    const remove = () => {
        removeFlatmate(flatmate.id);
    };

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
                        <Typography variant="h5">{flatmate.name}</Typography>
                        <Typography variant="h5">
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="h5">
                            ${value.toFixed(2)}
                        </Typography>
                    </Box>
                }
                secondary={(percentage * 100).toFixed(1) + '%'}
            />

            <IconButton color="secondary" onClick={remove}>
                <ClearIcon />
            </IconButton>
        </ListItem>
    );
};

export default Flatmate;
