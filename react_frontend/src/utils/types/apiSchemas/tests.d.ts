import { Squad } from './squads';

/**
 * Represents a test.
 */
export type Test = {
  id?: number;
  name?: string;
  race_score?: number;
  race_position?: number;
  value?: number;
  value_description?: string;
  penalty?: number;
  penalty_description?: string;
  squad: Squad;
};
