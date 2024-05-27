import { Student } from './students';

/**
 * Represents a squad.
 */
export type Squad = {
    id: number;
    name: string;
    grade?: number;
    car_id: string;
    students?: Student[];
}


/**
 * Represents the data structure for creating a squad.
 */
export type SquadCreate = {
    name: string;
    car_id: string;
    students?: Student[];
}

/**
 * Represents the data structure for updating a squad.
 */
export type SquadUpdate = {
    name?: string;
    car_id?: string;
}
