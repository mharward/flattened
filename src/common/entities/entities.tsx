export interface RoomProps {
    id: string;
    name: string;
    width: number;
    height: number;
    occupants: FlatmateProps[];
}

export interface FlatmateProps {
    id: string;
    name: string;
    color: string;
}
