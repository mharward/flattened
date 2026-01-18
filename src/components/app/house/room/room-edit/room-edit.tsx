import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { FlatmateProps, RoomProps } from '../../../../../common/entities';
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
    const [localRoom, setLocalRoom] = useState<RoomProps>(room);

    // Reset local state when dialog opens
    useEffect(() => {
        if (editDialogOpen) {
            setLocalRoom(room);
        }
    }, [editDialogOpen, room]);

    const nameError =
        localRoom.name.length === 0 || localRoom.name.length > MAX_NAME_LENGTH;

    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalRoom({ ...localRoom, name: event.target.value });
    };

    const widthError =
        localRoom.width < MIN_ROOM_SIZE || localRoom.width > MAX_ROOM_SIZE;

    const widthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setLocalRoom({ ...localRoom, width: isNaN(value) ? 0 : value });
    };

    const heightError =
        localRoom.height < MIN_ROOM_SIZE || localRoom.height > MAX_ROOM_SIZE;

    const heightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setLocalRoom({ ...localRoom, height: isNaN(value) ? 0 : value });
    };

    const noOccupants =
        (localRoom.occupantIds?.length ?? 0) === 0 && flatmates.length > 0;

    const dialogHasError: boolean =
        nameError || widthError || heightError || noOccupants;

    const handleSave = () => {
        if (!dialogHasError) {
            updateRoom(localRoom);
            closeDialog();
        }
    };

    const updateLocalRoom = (updatedRoom: RoomProps) => {
        setLocalRoom(updatedRoom);
    };

    return (
        <Dialog
            open={editDialogOpen}
            onClose={() => closeDialog()}
            fullWidth
        >
            <DialogTitle>Edit Room</DialogTitle>
            <DialogContent>
                <FormControl error={nameError}>
                    <InputLabel>Name</InputLabel>
                    <Input
                        required={true}
                        value={localRoom.name}
                        onChange={nameChange}
                        fullWidth={true}
                        autoFocus
                    />
                </FormControl>
                <Box display="flex" marginBottom="20px" marginTop="20px">
                    <Box marginRight="20px">
                        <FormControl error={widthError}>
                            <InputLabel>Width (m)</InputLabel>
                            <Input
                                type="number"
                                value={localRoom.width}
                                onChange={widthChange}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl error={heightError}>
                            <InputLabel>Depth (m)</InputLabel>
                            <Input
                                type="number"
                                value={localRoom.height}
                                onChange={heightChange}
                            />
                        </FormControl>
                    </Box>
                </Box>
                <FormControl error={noOccupants}>
                    <InputLabel shrink={true}>Room Occupants</InputLabel>
                    <List>
                        {flatmates.map((flatmate) => (
                            <OccupantListItem
                                key={flatmate.id}
                                flatmate={flatmate}
                                room={localRoom}
                                updateRoom={updateLocalRoom}
                            />
                        ))}
                    </List>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="inherit" onClick={closeDialog}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={handleSave}
                    disabled={dialogHasError}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomEdit;
