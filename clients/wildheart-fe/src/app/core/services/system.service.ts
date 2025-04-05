import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { System, SystemStatus } from '../models/system.model';
import { SystemRelationship, RelationshipType } from '../models/system-relationship.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private apiUrl = `${environment.apiUrl}/systems`;

  constructor(private http: HttpClient) {}

  getSystems(): Observable<System[]> {
    return this.http.get<System[]>(this.apiUrl);
  }

  getSystemById(id: string): Observable<System> {
    return this.http.get<System>(`${this.apiUrl}/${id}`);
  }

  createSystem(system: Partial<System>): Observable<System> {
    return this.http.post<System>(this.apiUrl, system);
  }

  updateSystem(id: string, system: Partial<System>): Observable<System> {
    return this.http.put<System>(`${this.apiUrl}/${id}`, system);
  }

  deleteSystem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSystemRelationships(systemId: string): Observable<SystemRelationship[]> {
    return this.http.get<SystemRelationship[]>(
      `${this.apiUrl}/${systemId}/relationships`
    );
  }

  createRelationship(
    sourceSystemId: string,
    targetSystemId: string,
    type: RelationshipType
  ): Observable<SystemRelationship> {
    return this.http.post<SystemRelationship>(`${this.apiUrl}/relationships`, {
      sourceSystemId,
      targetSystemId,
      type
    });
  }

  deleteRelationship(relationshipId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/relationships/${relationshipId}`
    );
  }

  getSystemsByProject(projectId: string): Observable<System[]> {
    return this.http.get<System[]>(`${this.apiUrl}/by-project/${projectId}`);
  }

  getSystemsByTeam(teamId: string): Observable<System[]> {
    return this.http.get<System[]>(`${this.apiUrl}/by-team/${teamId}`);
  }

  getSystemStatuses(): SystemStatus[] {
    return Object.values(SystemStatus);
  }

  getRelationshipTypes(): RelationshipType[] {
    return Object.values(RelationshipType);
  }
} 