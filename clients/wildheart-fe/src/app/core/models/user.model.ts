import { Team } from './team.model';

export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  
  // Optional related entities
  teams?: Team[];
} 