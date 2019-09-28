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
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import './room.scss';

interface RoomObject {
    name: string;
    width: number;
    height: number;
    remove(): void;
}

const Room: React.FC<RoomObject> = ({ name, width, height, remove }) => {
    const [people] = useState([
        { name: 'Peter Smith', color: '#446699' },
        { name: 'James Shaw', color: '#884422' },
    ]);

    return (
        <Card>
            <CardHeader
                action={
                    <Grid container direction="column">
                        <IconButton size="small" color="primary">
                            <CreateIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={remove}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                }
                title={name}
                subheader={
                    <Typography color="textSecondary" variant="body2">
                        {width} m x {height} m &bull; {width * height} m
                        <sup>2</sup>
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
                    {people.map((item, index) => (
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
