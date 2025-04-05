import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


interface Team {
  id: string;
  name: string;
  jiraGroupId: string;
  memberCount: number;
  projectCount: number;
}

@Component({
  selector: 'app-team-list',
  template: `
    <div class="team-list-container">
      <div class="team-list-header">
        <h1>Teams</h1>
        <button class="btn-primary" (click)="createNewTeam()">Create New Team</button>
      </div>
      
      <div class="team-list-content">
        <div class="team-list-filters">
          <input 
            type="text" 
            placeholder="Search teams..." 
            [(ngModel)]="searchTerm"
            (input)="filterTeams()"
            class="search-input"
          >
        </div>
        
        <div class="team-list-table">
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Jira Group ID</th>
                <th>Members</th>
                <th>Projects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let team of filteredTeams">
                <td>{{ team.name }}</td>
                <td>{{ team.jiraGroupId }}</td>
                <td>{{ team.memberCount }}</td>
                <td>{{ team.projectCount }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-icon" (click)="viewTeamDetails(team.id)">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" (click)="editTeam(team.id)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" (click)="deleteTeam(team.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="filteredTeams.length === 0">
                <td colspan="5" class="no-results">No teams found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-list-container {
      padding: 20px;
    }
    .team-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .team-list-filters {
      margin-bottom: 20px;
    }
    .search-input {
      width: 100%;
      max-width: 300px;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    .team-list-table {
      width: 100%;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    .action-buttons {
      display: flex;
      gap: 8px;
    }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: #666;
      transition: color 0.2s;
    }
    .btn-icon:hover {
      color: #5A67D8;
    }
    .btn-primary {
      background-color: #5A67D8;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-primary:hover {
      background-color: #4C51BF;
    }
    .no-results {
      text-align: center;
      color: #666;
      padding: 20px;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  filteredTeams: Team[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // In a real application, this would fetch data from a service
    this.teams = [
      { id: '1', name: 'Frontend Team', jiraGroupId: 'FE', memberCount: 5, projectCount: 3 },
      { id: '2', name: 'Backend Team', jiraGroupId: 'BE', memberCount: 4, projectCount: 2 },
      { id: '3', name: 'DevOps Team', jiraGroupId: 'DO', memberCount: 3, projectCount: 4 },
      { id: '4', name: 'QA Team', jiraGroupId: 'QA', memberCount: 2, projectCount: 5 }
    ];
    this.filteredTeams = [...this.teams];
  }

  filterTeams(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTeams = [...this.teams];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredTeams = this.teams.filter(team => 
      team.name.toLowerCase().includes(term) || 
      team.jiraGroupId.toLowerCase().includes(term)
    );
  }

  viewTeamDetails(id: string): void {
    this.router.navigate(['/teams/details', id]);
  }

  editTeam(id: string): void {
    // In a real application, this would navigate to an edit page
    console.log('Edit team with ID:', id);
  }

  deleteTeam(id: string): void {
    // In a real application, this would show a confirmation dialog
    console.log('Delete team with ID:', id);
  }

  createNewTeam(): void {
    // In a real application, this would navigate to a create page
    console.log('Create new team');
  }
} 