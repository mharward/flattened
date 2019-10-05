import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    InputLabel,
    List,
} from '@material-ui/core';
import { cloneDeep } from 'lodash';
import './room-edit.scss';
import OccupantListItem from './occupant-list-item';

interface RoomEditObject {
    room: RoomObject;
    updateRoom(updatedRoom: RoomObject): void;
    editDialogOpen: boolean;
    closeDialog(): void;
    flatmates: any[];
}

interface RoomObject {
    id: string;
    name: string;
    width: number;
    height: number;
    occupants: any[];
}

const RoomEdit: React.FC<RoomEditObject> = ({
    room,
    updateRoom,
    editDialogOpen,
    closeDialog,
    flatmates,
}) => {
    const nameChange = (event: any) => {
        const newRoom = cloneDeep(room);
        newRoom.name = event.target.value;
        updateRoom(newRoom);
    };

    const widthChange = (event: any) => {
        const newRoom = cloneDeep(room);
        newRoom.width = event.target.value;
        updateRoom(newRoom);
    };

    const heightChange = (event: any) => {
        const newRoom = cloneDeep(room);
        newRoom.height = event.target.value;
        updateRoom(newRoom);
    };

    return (
        <Dialog open={editDialogOpen} onClose={closeDialog} fullWidth={true}>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogContent>
                <InputLabel>Name</InputLabel>
                <Input
                    value={room.name}
                    onChange={nameChange}
                    fullWidth={true}
                    autoFocus
                ></Input>
                <Box display="flex" marginBottom="20px" marginTop="20px">
                    <Box marginRight="20px">
                        <InputLabel>Width (m)</InputLabel>
                        <Input
                            type="number"
                            value={room.width}
                            onChange={widthChange}
                        ></Input>
                    </Box>
                    <Box>
                        <InputLabel>Height (m)</InputLabel>
                        <Input
                            type="number"
                            value={room.height}
                            onChange={heightChange}
                        ></Input>
                    </Box>
                </Box>
                <InputLabel>Room Occupants</InputLabel>
                <List>
                    {flatmates.map(flatmate => (
                        <OccupantListItem
                            flatmate={flatmate}
                            room={room}
                            updateRoom={updateRoom}
                        />
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomEdit;
