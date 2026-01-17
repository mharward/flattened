import React from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Switch,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { FlatmateProps, RoomProps } from '../../../../../../common/entities';

interface OccupantListItemProps {
    flatmate: FlatmateProps;
    room: RoomProps;
    updateRoom(updatedRoom: RoomProps): void;
}

const OccupantListItem: React.FC<OccupantListItemProps> = ({
    flatmate,
    room,
    updateRoom,
}) => {
    const isOccupant = room.occupantIds.includes(flatmate.id);

    const toggleOccupancy = () => {
        const newOccupantIds = isOccupant
            ? room.occupantIds.filter((id) => id !== flatmate.id)
            : [...room.occupantIds, flatmate.id];
        updateRoom({ ...room, occupantIds: newOccupantIds });
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
            <ListItemText primary={flatmate.name} />
            <Switch
                color="primary"
                checked={isOccupant}
                onChange={toggleOccupancy}
            />
        </ListItem>
    );
};

export default OccupantListItem;
