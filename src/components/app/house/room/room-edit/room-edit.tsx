import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    List,
} from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { FlatmateProps, RoomProps } from '../../../../../common/entities';
import './room-edit.scss';
import OccupantListItem from './occupant-list-item';

interface RoomEditProps {
    room: RoomProps;
    updateRoom(updatedRoom: RoomProps): void;
    editDialogOpen: boolean;
    closeDialog(): void;
    flatmates: FlatmateProps[];
}

const MAX_NAME_LENGTH = 20;
const MAX_ROOM_SIZE = 30;
const MIN_ROOM_SIZE = 1;

const RoomEdit: React.FC<RoomEditProps> = ({
    room,
    updateRoom,
    editDialogOpen,
    closeDialog,
    flatmates,
}) => {
    const nameError =
        room.name.length === 0 || room.name.length > MAX_NAME_LENGTH;

    const nameChange = (event: any) => {
        const newRoom = cloneDeep(room);
        newRoom.name = event.target.value;
        updateRoom(newRoom);
    };

    const widthError = room.width < MIN_ROOM_SIZE || room.width > MAX_ROOM_SIZE;

    const widthChange = (event: any) => {
        const newRoom = cloneDeep(room);
        newRoom.width = event.target.value;
        updateRoom(newRoom);
    };

    const heightError =
        room.height < MIN_ROOM_SIZE || room.height > MAX_ROOM_SIZE;

    const heightChange = (event: any) => {
        const newRoom = cloneDeep(room);
        newRoom.height = event.target.value;
        updateRoom(newRoom);
    };

    const noOccupants = room.occupants.length === 0 && flatmates.length > 0;

    const dialogHasError: boolean =
        nameError || widthError || heightError || noOccupants;

    return (
        <Dialog
            open={editDialogOpen}
            onClose={closeDialog}
            disableBackdropClick={dialogHasError}
            disableEscapeKeyDown={dialogHasError}
            fullWidth
        >
            <DialogTitle>Edit Room</DialogTitle>
            <DialogContent>
                <FormControl error={nameError}>
                    <InputLabel>Name</InputLabel>
                    <Input
                        required={true}
                        value={room.name}
                        onChange={nameChange}
                        fullWidth={true}
                        autoFocus
                    ></Input>
                </FormControl>
                <Box display="flex" marginBottom="20px" marginTop="20px">
                    <Box marginRight="20px">
                        <FormControl error={widthError}>
                            <InputLabel>Width (m)</InputLabel>
                            <Input
                                type="number"
                                value={room.width}
                                onChange={widthChange}
                            ></Input>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl error={heightError}>
                            <InputLabel>Height (m)</InputLabel>
                            <Input
                                type="number"
                                value={room.height}
                                onChange={heightChange}
                            ></Input>
                        </FormControl>
                    </Box>
                </Box>
                <FormControl error={noOccupants}>
                    <InputLabel shrink={true}>Room Occupants</InputLabel>
                    <List>
                        {flatmates.map(flatmate => (
                            <OccupantListItem
                                key={flatmate.id}
                                flatmate={flatmate}
                                room={room}
                                updateRoom={updateRoom}
                            />
                        ))}
                    </List>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={closeDialog}
                    disabled={dialogHasError}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomEdit;
