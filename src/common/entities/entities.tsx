export interface RoomProps {
    id: string;
    name: string;
    width: number;
    height: number;
    occupantIds: string[];
}

export interface FlatmateProps {
    id: string;
    name: string;
    color: string;
}
