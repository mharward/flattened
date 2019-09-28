import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { cloneDeep } from 'lodash';
import ItemTypes from '../../../common/item-types';
import './house.scss';
import Room from './room';

interface RoomObject {
    name: string;
}

const House: React.FC = () => {
    const [rooms, setRooms] = useState([{ name: 'Initial Room' }]);

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.ROOM,
        drop: (item: any) => {
            const newRooms = cloneDeep(rooms);
            if (item) newRooms.push({ name: item.name });
            setRooms(newRooms);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const addRoom = (item: RoomObject) => {
        const newRooms = cloneDeep(rooms);
        if (item) newRooms.push({ name: item.name });
        setRooms(newRooms);
    };

    const isActive = canDrop && isOver;

    return (
        <div ref={drop}>
            {isActive ? 'Release to drop' : 'Drag a room here'}
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                {rooms.map((item, index) => (
                    <Grid key={index} item>
                        <Room
                            name={item.name}
                            width={1}
                            height={1}
                            key={index}
                        ></Room>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => addRoom({ name: 'Room' })}
            >
                Add Room
            </Button>
        </div>
    );
};

export default House;
