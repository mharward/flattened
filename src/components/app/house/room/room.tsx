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
import { FlatmateProps, RoomProps } from '../../../../common/entities';
import RoomEdit from './room-edit';
import './room.scss';

const MAX_WIDTH = 350;
const MAX_HEIGHT = 350;
const PIXELS_PER_METER = 40;

interface RoomCardProps {
    room: RoomProps;
    updateRoom(updatedRoom: RoomProps): void;
    remove(): void;
    flatmates: FlatmateProps[];
}

const Room: React.FC<RoomCardProps> = ({
    room,
    updateRoom,
    remove,
    flatmates,
}) => {
    // TODO: allow drag and drop of rooms within house

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const openDialog = (event: any) => {
        setEditDialogOpen(true);
    };

    const closeDialog = () => {
        setEditDialogOpen(false);
    };

    const rawWidth = room.width * PIXELS_PER_METER;
    const rawHeight = room.height * PIXELS_PER_METER;

    const cardWidth = rawWidth > MAX_WIDTH ? MAX_WIDTH : rawWidth;
    const cardHeight = rawHeight > MAX_HEIGHT ? MAX_HEIGHT : rawHeight;

    return (
        <Card
            style={{
                minWidth: cardWidth,
                minHeight: cardHeight,
                maxWidth: MAX_WIDTH,
                maxHeight: MAX_HEIGHT,
            }}
        >
            <CardHeader
                className="room-card-header"
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
                title={
                    <Typography noWrap variant="h5">
                        {room.name}
                    </Typography>
                }
                subheader={
                    <Typography color="textSecondary" variant="body2">
                        {room.width}&nbsp;m x {room.height}&nbsp;m&nbsp;&bull;{' '}
                        {room.width * room.height}&nbsp;m<sup>2</sup>
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
