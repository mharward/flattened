import React, { useState } from 'react';
import { useDrop } from 'react-dnd'
import { cloneDeep } from 'lodash';
import { default as Room } from '../room'
import ItemTypes from '../../../common/item-types'
import './house.scss';

const House: React.FC = () => {
    const [rooms, setRooms] = useState([ { name: "Initial Room" }]);

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
      })
    
      const isActive = canDrop && isOver
    
      return (
        <div ref={drop}>
          {isActive ? 'Release to drop' : 'Drag a room here'}
          {rooms.map((item, index) => (
            <Room name={item.name} key={index}></Room>
          ))}
        </div>
      );
}

export default House;