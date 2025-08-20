export interface Tracker {
    id: string;
    position: {
        x: number;
        y: number;
    },
    battery: {
        level: number;
        charging: boolean;
    }
    version: string;
}