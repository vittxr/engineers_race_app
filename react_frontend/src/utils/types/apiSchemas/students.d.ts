/**
 * Represents a student.
*/
export type Student = {
    id?: number
    name?: string 
    RA?: string
}

/**
 * Represents the data required to create a student.
 */
export type StudentCreate = {
    name: string
    RA: string
}

/**
 * Represents the update payload for a student.
 */
export type StudentUpdate = {
    name?: string
    RA?: string
}