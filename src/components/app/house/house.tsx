import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { cloneDeep } from 'lodash';
import ItemTypes from '../../../common/item-types';
import './house.scss';
import Room from './room';

interface HouseProps {
    rooms: any[];
    setRooms(rooms: any[]): void;
    createNewRoom(name: string): any;
}

interface RoomObject {
    id: string;
    name: string;
}

const House: React.FC<HouseProps> = ({ rooms, setRooms, createNewRoom }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.ROOM,
        drop: (item: any) => {
            const newRooms = cloneDeep(rooms);
            if (item) newRooms.push(createNewRoom('Room'));
            setRooms(newRooms);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const addRoom = (item: RoomObject) => {
        if (!item) return;
        const newRooms = cloneDeep(rooms);
        newRooms.push(item);
        setRooms(newRooms);
    };

    const removeRoom = (item: RoomObject) => {
        const newRooms = cloneDeep(rooms).filter(room => room.id !== item.id);
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
                {rooms.map(item => (
                    <Grid key={item.id} item>
                        <Room
                            name={item.name}
                            width={item.width}
                            height={item.height}
                            occupants={item.occupants}
                            remove={() => removeRoom(item)}
                        ></Room>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => addRoom(createNewRoom('New Room'))}
            >
                Add Room
            </Button>
        </div>
    );
};

export default House;
