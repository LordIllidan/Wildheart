import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  joinDate: Date;
}

interface Team {
  id: string;
  name: string;
  jiraGroupId: string;
}

@Component({
  selector: 'app-team-members',
  template: `
    <div class="team-members-container">
      <div class="team-members-header">
        <div class="team-members-title">
          <h1>{{ team?.name }} - Members</h1>
          <span class="team-id">ID: {{ team?.id }}</span>
        </div>
        <div class="team-members-actions">
          <button class="btn-secondary" (click)="goBack()">Back to Team</button>
          <button class="btn-primary" (click)="addMember()">Add Member</button>
        </div>
      </div>

      <div class="team-members-content">
        <div class="team-members-filters">
          <input 
            type="text" 
            placeholder="Search members..." 
            [(ngModel)]="searchTerm"
            (input)="filterMembers()"
            class="search-input"
          >
          <div class="filter-options">
            <select [(ngModel)]="roleFilter" (change)="filterMembers()">
              <option value="">All Roles</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="QA">QA</option>
            </select>
          </div>
        </div>

        <div class="team-members-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let member of filteredMembers">
                <td>{{ member.firstName }} {{ member.lastName }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.role }}</td>
                <td>{{ member.joinDate | date:'mediumDate' }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-icon" (click)="editMember(member.id)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" (click)="removeMember(member.id)">
                      <i class="fas fa-user-minus"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="filteredMembers.length === 0">
                <td colspan="5" class="no-results">No members found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-members-container {
      padding: 20px;
    }
    .team-members-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .team-members-title {
      display: flex;
      flex-direction: column;
    }
    .team-id {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }
    .team-members-actions {
      display: flex;
      gap: 10px;
    }
    .team-members-filters {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .search-input {
      flex: 1;
      min-width: 200px;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    .filter-options select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      background-color: white;
    }
    .team-members-table {
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
    .btn-primary, .btn-secondary {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      border: none;
    }
    .btn-primary {
      background-color: #5A67D8;
      color: white;
    }
    .btn-primary:hover {
      background-color: #4C51BF;
    }
    .btn-secondary {
      background-color: #E2E8F0;
      color: #4A5568;
    }
    .btn-secondary:hover {
      background-color: #CBD5E0;
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
    RouterModule
  ]
})
export class TeamMembersComponent implements OnInit {
  team: Team | null = null;
  teamId: string = '';
  members: TeamMember[] = [];
  filteredMembers: TeamMember[] = [];
  searchTerm: string = '';
  roleFilter: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id') || '';
    
    // In a real application, this would fetch data from a service
    this.team = {
      id: this.teamId,
      name: 'Frontend Team',
      jiraGroupId: 'FE'
    };
    
    this.members = [
      { 
        id: '1', 
        firstName: 'John', 
        lastName: 'Doe', 
        email: 'john.doe@example.com', 
        role: 'Developer', 
        joinDate: new Date('2023-01-15') 
      },
      { 
        id: '2', 
        firstName: 'Jane', 
        lastName: 'Smith', 
        email: 'jane.smith@example.com', 
        role: 'Designer', 
        joinDate: new Date('2023-02-10') 
      },
      { 
        id: '3', 
        firstName: 'Bob', 
        lastName: 'Johnson', 
        email: 'bob.johnson@example.com', 
        role: 'Developer', 
        joinDate: new Date('2023-03-05') 
      },
      { 
        id: '4', 
        firstName: 'Alice', 
        lastName: 'Williams', 
        email: 'alice.williams@example.com', 
        role: 'QA', 
        joinDate: new Date('2023-04-20') 
      },
      { 
        id: '5', 
        firstName: 'Charlie', 
        lastName: 'Brown', 
        email: 'charlie.brown@example.com', 
        role: 'Manager', 
        joinDate: new Date('2023-01-01') 
      }
    ];
    
    this.filteredMembers = [...this.members];
  }

  filterMembers(): void {
    let filtered = [...this.members];
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(member => 
        member.firstName.toLowerCase().includes(term) || 
        member.lastName.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term)
      );
    }
    
    // Filter by role
    if (this.roleFilter) {
      filtered = filtered.filter(member => member.role === this.roleFilter);
    }
    
    this.filteredMembers = filtered;
  }

  goBack(): void {
    this.router.navigate(['/teams/details', this.teamId]);
  }

  addMember(): void {
    // In a real application, this would open a modal or navigate to a form
    console.log('Add new member to team:', this.teamId);
  }

  editMember(id: string): void {
    // In a real application, this would open a modal or navigate to a form
    console.log('Edit member with ID:', id);
  }

  removeMember(id: string): void {
    // In a real application, this would show a confirmation dialog
    console.log('Remove member with ID:', id);
  }
} 