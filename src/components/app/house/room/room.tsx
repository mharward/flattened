import React, { useState } from 'react';
import {
    Avatar,
    CardContent,
    CardHeader,
    Card,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import RoomEdit from './room-edit';
import './room.scss';

interface RoomCardObject {
    room: RoomObject;
    updateRoom(updatedRoom: RoomObject): void;
    remove(): void;
    flatmates: any[];
}

interface RoomObject {
    id: string;
    name: string;
    width: number;
    height: number;
    occupants: any[];
}

const Room: React.FC<RoomCardObject> = ({
    room,
    updateRoom,
    remove,
    flatmates,
}) => {
    // TODO: resize cards based on room size
    // TODO: allow drag and drop of rooms within house

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const openDialog = (event: any) => {
        setEditDialogOpen(true);
    };

    const closeDialog = () => {
        setEditDialogOpen(false);
    };

    return (
        <Card>
            <CardHeader
                action={
                    <Grid container direction="column">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={openDialog}
                        >
                            <CreateIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={remove}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <RoomEdit
                            room={room}
                            updateRoom={updateRoom}
                            editDialogOpen={editDialogOpen}
                            closeDialog={closeDialog}
                            flatmates={flatmates}
                        />
                    </Grid>
                }
                title={room.name}
                subheader={
                    <Typography color="textSecondary" variant="body2">
                        {room.width} m x {room.height} m &bull;{' '}
                        {room.width * room.height} m<sup>2</sup>
                    </Typography>
                }
            />
            <CardContent
                style={{ padding: 10, paddingTop: 0, paddingBottom: 16 }}
            >
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                >
                    {room.occupants.map((item, index) => (
                        <Grid key={index} item>
                            <Tooltip title={item.name}>
                                <Avatar
                                    style={{
                                        backgroundColor: item.color,
                                        width: '1.3em',
                                        height: '1.3em',
                                    }}
                                >
                                    <PersonIcon fontSize="small" />
                                </Avatar>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Room;
