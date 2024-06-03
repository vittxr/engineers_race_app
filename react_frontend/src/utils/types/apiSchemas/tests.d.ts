import { Squad } from './squads';

/**
 * Represents a test.
 */
export type Test = {
  id: number;
  name: string;
  value: number;
  value_description: string;
  penalty?: number;
  penalty_description?: string;
  grade?: number;
  squad: Squad;
};
