import React from 'react';
import { Box } from '@material-ui/core';
import { useDrag } from 'react-dnd';
import ItemTypes from '../../../common/item-types';
import './room-template.scss';

interface RoomTemplateProps {
    name: string;
}

const RoomTemplate: React.FC<RoomTemplateProps> = ({ name }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.ROOM },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;

    return (
        <div className="room-template" ref={drag} style={{ opacity: opacity }}>
            <Box>{name}</Box>
        </div>
    );
};

export default RoomTemplate;