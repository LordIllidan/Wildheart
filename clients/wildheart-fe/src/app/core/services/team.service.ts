import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = `${environment.apiUrl}/teams`;

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  createTeam(team: Partial<Team>): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  updateTeam(id: string, team: Partial<Team>): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTeamMembers(teamId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${teamId}/members`);
  }

  addTeamMember(teamId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${teamId}/members`, { userId });
  }

  removeTeamMember(teamId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${teamId}/members/${userId}`);
  }
} 