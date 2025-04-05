import { System } from './system.model';

export enum RelationshipType {
  Dependency = 'Dependency',
  Synchronization = 'Synchronization',
  Integration = 'Integration',
  DataFlow = 'DataFlow',
  Authentication = 'Authentication',
  Authorization = 'Authorization'
}

export interface SystemRelationship {
  id: string;
  sourceSystemId: string;
  targetSystemId: string;
  type: RelationshipType;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  isDeleted: boolean;
  deletedReason: string;
  description: string;
  // Optional related entities
  sourceSystem?: System;
  targetSystem?: System;
} 