import { System } from './system.model';

export interface Project {
  id: string;
  name: string;
  description: string;
  manager: string;
  startDate: Date;
  endDate?: Date;
  
  // Optional related entities
  systems?: System[];
} 