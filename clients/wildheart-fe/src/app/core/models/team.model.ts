import { User } from './user.model';
import { System } from './system.model';

export interface Team {
  id: string;
  name: string;
  jiraGroupId: string;
  
  // Optional related entities
  members?: User[];
  systems?: System[];
} 