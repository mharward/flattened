import { RoomProps, FlatmateProps } from '../entities';
import { getAvatarColor } from './avatar-color';

export const getNextId = (items: { id: string }[], prefix: string): number => {
    if (items.length === 0) return 1;
    const maxId = items.reduce((max, item) => {
        const num = parseInt(item.id.replace(prefix, ''), 10);
        return isNaN(num) ? max : Math.max(num, max);
    }, 0);
    return maxId + 1;
};

export const createFlatmate = (
    existingFlatmates: FlatmateProps[],
    name?: string
): FlatmateProps => {
    const newFlatmateId = getNextId(existingFlatmates, 'flatmate');
    const defaultName = 'Flatmate ' + newFlatmateId;

    return {
        id: 'flatmate' + newFlatmateId,
        name: name || defaultName,
        color: getAvatarColor(),
    };
};

export const createNewRoom = (
    existingRooms: RoomProps[],
    name?: string,
    width?: number,
    height?: number,
    occupantIds?: string[]
): RoomProps => {
    const newRoomId = getNextId(existingRooms, 'room');
    return {
        id: 'room' + newRoomId,
        name: name || 'Room ' + newRoomId,
        occupantIds: occupantIds || [],
        width: width || 3,
        height: height || 3,
    };
};

export const buildDefaultFlatmates = (): FlatmateProps[] => {
    const flatmates: FlatmateProps[] = [];
    flatmates.push(createFlatmate(flatmates, 'Jane Flatter'));
    flatmates.push(createFlatmate(flatmates, 'Phil Renter'));
    return flatmates;
};

export const buildDefaultRooms = (flatmates: FlatmateProps[]): RoomProps[] => {
    const allIds = flatmates.map((f) => f.id);
    const rooms: RoomProps[] = [];
    rooms.push(createNewRoom(rooms, 'Bedroom', 3, 4, allIds));
    rooms.push(createNewRoom(rooms, 'Living Area', 4, 4, allIds));
    rooms.push(createNewRoom(rooms, 'Bathroom', 3, 2, allIds));
    return rooms;
};

export const buildTwoBedroomsRooms = (
    flatmates: FlatmateProps[]
): RoomProps[] => {
    const allIds = flatmates.map((f) => f.id);
    const rooms: RoomProps[] = [];
    rooms.push(createNewRoom(rooms, 'Master Bedroom', 5, 4, [flatmates[0].id]));
    rooms.push(createNewRoom(rooms, 'Small Bedroom', 3, 3, [flatmates[1].id]));
    rooms.push(createNewRoom(rooms, 'Living Area', 4, 4, allIds));
    rooms.push(createNewRoom(rooms, 'Kitchen', 3, 4, allIds));
    rooms.push(createNewRoom(rooms, 'Bathroom', 3, 2, allIds));
    return rooms;
};

export const buildThreeBedroomsData = (): {
    flatmates: FlatmateProps[];
    rooms: RoomProps[];
} => {
    const flatmates: FlatmateProps[] = [];
    flatmates.push(createFlatmate(flatmates, 'Jane Flatter'));
    flatmates.push(createFlatmate(flatmates, 'Phil Renter'));
    flatmates.push(createFlatmate(flatmates, 'Eliza Housemate'));
    flatmates.push(createFlatmate(flatmates, 'John Tenant'));

    const allIds = flatmates.map((f) => f.id);
    const rooms: RoomProps[] = [];
    rooms.push(
        createNewRoom(rooms, 'Master Bedroom', 5, 4, [
            flatmates[0].id,
            flatmates[1].id,
        ])
    );
    rooms.push(
        createNewRoom(rooms, 'Ensuite', 3, 2, [
            flatmates[0].id,
            flatmates[1].id,
        ])
    );
    rooms.push(createNewRoom(rooms, 'Bedroom', 4, 4, [flatmates[2].id]));
    rooms.push(createNewRoom(rooms, 'Small Bedroom', 3, 3, [flatmates[3].id]));
    rooms.push(createNewRoom(rooms, 'Living Area', 5, 4, allIds));
    rooms.push(createNewRoom(rooms, 'Kitchen', 3, 4, allIds));
    rooms.push(createNewRoom(rooms, 'Bathroom', 3, 2, allIds));

    return { flatmates, rooms };
};

export const buildManyBedroomsData = (): {
    flatmates: FlatmateProps[];
    rooms: RoomProps[];
} => {
    const flatmates: FlatmateProps[] = [];
    flatmates.push(createFlatmate(flatmates, 'Jane Flatter'));
    flatmates.push(createFlatmate(flatmates, 'Phil Renter'));
    flatmates.push(createFlatmate(flatmates, 'Eliza Housemate'));
    flatmates.push(createFlatmate(flatmates, 'John Tenant'));
    flatmates.push(createFlatmate(flatmates, 'Rachel Roommate'));
    flatmates.push(createFlatmate(flatmates, 'Paul Tenant'));

    const allIds = flatmates.map((f) => f.id);
    const rooms: RoomProps[] = [];
    rooms.push(
        createNewRoom(rooms, 'Master Bedroom', 5, 4, [
            flatmates[0].id,
            flatmates[1].id,
        ])
    );
    rooms.push(
        createNewRoom(rooms, 'Master Ensuite', 3, 2, [
            flatmates[0].id,
            flatmates[1].id,
        ])
    );
    rooms.push(createNewRoom(rooms, 'Bedroom', 4, 4, [flatmates[2].id]));
    rooms.push(createNewRoom(rooms, 'Small Bedroom', 3, 3, [flatmates[4].id]));
    rooms.push(createNewRoom(rooms, 'Living Area', 5, 5, allIds));
    rooms.push(createNewRoom(rooms, 'Kitchen', 4, 4, allIds));
    rooms.push(
        createNewRoom(rooms, 'Bathroom', 3, 2, [
            flatmates[0].id,
            flatmates[1].id,
            flatmates[2].id,
            flatmates[4].id,
        ])
    );
    rooms.push(
        createNewRoom(rooms, 'Sleepout Bedroom', 3, 3, [
            flatmates[3].id,
            flatmates[5].id,
        ])
    );
    rooms.push(
        createNewRoom(rooms, 'Sleepout Bathroom', 3, 2, [
            flatmates[3].id,
            flatmates[5].id,
        ])
    );
    rooms.push(
        createNewRoom(rooms, 'Sleepout Living', 3, 3, [
            flatmates[3].id,
            flatmates[5].id,
        ])
    );

    return { flatmates, rooms };
};
