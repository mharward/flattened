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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
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
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const openDialog = () => {
        setEditDialogOpen(true);
    };

    const closeDialog = () => {
        setEditDialogOpen(false);
    };

    const rawWidth = room.width * PIXELS_PER_METER;
    const rawHeight = room.height * PIXELS_PER_METER;

    const cardWidth = rawWidth > MAX_WIDTH ? MAX_WIDTH : rawWidth;
    const cardHeight = rawHeight > MAX_HEIGHT ? MAX_HEIGHT : rawHeight;

    // Get occupant details from flatmates list
    const occupants = flatmates.filter((f) =>
        room.occupantIds?.includes(f.id)
    );

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
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                >
                    {occupants.map((occupant) => (
                        <Grid key={occupant.id} item>
                            <Tooltip title={occupant.name}>
                                <Avatar
                                    style={{
                                        backgroundColor: occupant.color,
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
