import { Project } from "./project.model";
import { SystemRelationship } from "./system-relationship.model";
import { Team } from "./team.model";

export enum SystemStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Maintenance = 'Maintenance',
  Deprecated = 'Deprecated'
}

export interface System {
  id: string;
  name: string;
  namespace: string;
  ipAddress: string;
  isKubernetes: boolean;
  projectId: string;
  teamId: string;
  tag: string;
  status: SystemStatus;
  description: string;
  
  // Optional related entities
  project?: Project;
  team?: Team;
  sourceRelationships?: SystemRelationship[];
  targetRelationships?: SystemRelationship[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  isDeleted: boolean;
  deletedReason: string;
} 