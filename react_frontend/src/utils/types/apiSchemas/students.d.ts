/**
 * Represents a student.
*/
export type Student = {
    id?: number
    name?: string 
    RA?: number
}

/**
 * Represents the data required to create a student.
 */
export type StudentCreate = {
    name: string
    RA: number
}

/**
 * Represents the update payload for a student.
 */
export type StudentUpdate = {
    name?: string
    RA?: number
}