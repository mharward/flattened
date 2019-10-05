import React from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Switch,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { cloneDeep } from 'lodash';
import './occupant-list-item.scss';

interface OccupantListItemProps {
    flatmate: any;
    room: RoomObject;
    updateRoom(room: RoomObject): void;
}

interface RoomObject {
    id: string;
    name: string;
    width: number;
    height: number;
    occupants: any[];
}

const OccupantListItem: React.FC<OccupantListItemProps> = ({
    flatmate,
    room,
    updateRoom,
}) => {
    const isOccupant = () => {
        return !!room.occupants.find(occupant => occupant.id === flatmate.id);
    };

    const updateOccupant = (event: any) => {
        const isOccupant = event.target.checked;
        const newRoom = cloneDeep(room);
        const existingOccupant = newRoom.occupants.find(
            occupant => occupant.id === flatmate.id
        );
        if (isOccupant && !existingOccupant) {
            newRoom.occupants.push(flatmate);
            updateRoom(newRoom);
        } else if (!isOccupant && existingOccupant) {
            newRoom.occupants = newRoom.occupants.filter(
                occupant => occupant.id !== flatmate.id
            );
            updateRoom(newRoom);
        }
    };

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    style={{
                        backgroundColor: flatmate.color,
                        width: '1.3em',
                        height: '1.3em',
                    }}
                >
                    <PersonIcon fontSize="small" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={flatmate.name}></ListItemText>
            <Switch
                color="primary"
                checked={isOccupant()}
                onChange={updateOccupant}
            ></Switch>
        </ListItem>
    );
};

export default OccupantListItem;
