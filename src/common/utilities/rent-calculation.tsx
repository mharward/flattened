import { FlatmateProps, RoomProps } from '../entities';

export interface RentCalculation {
    flatmateArea: number;
    percentage: number;
    rentAmount: number;
    dedicatedArea: number;
    sharedArea: number;
    totalArea: number;
}

export function calculateRentForFlatmate(
    flatmate: FlatmateProps,
    rooms: RoomProps[],
    totalArea: number,
    totalRent: number,
    flatmateCount: number
): RentCalculation {
    // Calculate the proportional area this flatmate uses
    const flatmateArea = rooms
        .filter(
            (room) =>
                (room.occupantIds?.length ?? 0) === 0 ||
                room.occupantIds?.includes(flatmate.id)
        )
        .map(
            (room) =>
                (room.width * room.height) /
                (room.occupantIds?.length || flatmateCount)
        )
        .reduce((total, roomAreaForOccupant) => total + roomAreaForOccupant, 0);

    const percentage = totalArea > 0 ? flatmateArea / totalArea : 1 / flatmateCount;
    const rentAmount = totalRent * percentage;

    // Calculate dedicated area (rooms only this flatmate uses)
    const dedicatedArea = rooms
        .filter(
            (room) =>
                (flatmateCount === 1 && (room.occupantIds?.length ?? 0) === 0) ||
                (room.occupantIds?.length === 1 &&
                    room.occupantIds?.includes(flatmate.id))
        )
        .map((room) => room.width * room.height)
        .reduce((total, roomArea) => total + roomArea, 0);

    // Calculate shared area (rooms this flatmate shares with others)
    const sharedArea = rooms
        .filter(
            (room) =>
                (flatmateCount > 1 && (room.occupantIds?.length ?? 0) === 0) ||
                ((room.occupantIds?.length ?? 0) > 1 &&
                    room.occupantIds?.includes(flatmate.id))
        )
        .map((room) => room.width * room.height)
        .reduce((total, roomArea) => total + roomArea, 0);

    return {
        flatmateArea,
        percentage,
        rentAmount,
        dedicatedArea,
        sharedArea,
        totalArea: dedicatedArea + sharedArea,
    };
}
