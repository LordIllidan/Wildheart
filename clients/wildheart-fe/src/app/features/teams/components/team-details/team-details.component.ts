import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface Team {
  id: string;
  name: string;
  jiraGroupId: string;
  memberCount: number;
  projectCount: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-team-details',
  template: `
    <div class="team-details-container">
      <div class="team-details-header">
        <div class="team-details-title">
          <h1>{{ team?.name }}</h1>
          <span class="team-id">ID: {{ team?.id }}</span>
        </div>
        <div class="team-details-actions">
          <button class="btn-secondary" (click)="goBack()">Back to Teams</button>
          <button class="btn-primary" (click)="editTeam()">Edit Team</button>
        </div>
      </div>

      <div class="team-details-content">
        <div class="team-details-card">
          <h2>Team Information</h2>
          <div class="team-info-grid">
            <div class="info-item">
              <span class="info-label">Jira Group ID:</span>
              <span class="info-value">{{ team?.jiraGroupId }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Members:</span>
              <span class="info-value">{{ team?.memberCount }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Projects:</span>
              <span class="info-value">{{ team?.projectCount }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Created:</span>
              <span class="info-value">{{ team?.createdAt | date:'medium' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Last Updated:</span>
              <span class="info-value">{{ team?.updatedAt | date:'medium' }}</span>
            </div>
          </div>
        </div>

        <div class="team-details-card">
          <h2>Description</h2>
          <p class="team-description">{{ team?.description || 'No description available.' }}</p>
        </div>

        <div class="team-details-navigation">
          <a [routerLink]="['/teams/members', team?.id]" class="nav-card">
            <div class="nav-card-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="nav-card-content">
              <h3>Team Members</h3>
              <p>View and manage team members</p>
            </div>
          </a>
          <a [routerLink]="['/teams/projects', team?.id]" class="nav-card">
            <div class="nav-card-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <div class="nav-card-content">
              <h3>Team Projects</h3>
              <p>View and manage team projects</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-details-container {
      padding: 20px;
    }
    .team-details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .team-details-title {
      display: flex;
      flex-direction: column;
    }
    .team-id {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }
    .team-details-actions {
      display: flex;
      gap: 10px;
    }
    .team-details-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .team-details-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    .team-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    .info-item {
      display: flex;
      flex-direction: column;
    }
    .info-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }
    .info-value {
      font-weight: 500;
    }
    .team-description {
      margin-top: 15px;
      line-height: 1.6;
    }
    .team-details-navigation {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .nav-card {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .nav-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .nav-card-icon {
      font-size: 24px;
      color: #5A67D8;
      margin-right: 15px;
    }
    .nav-card-content h3 {
      margin: 0 0 5px 0;
    }
    .nav-card-content p {
      margin: 0;
      color: #666;
      font-size: 14px;
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
    
    @media (min-width: 768px) {
      .team-details-content {
        grid-template-columns: 2fr 1fr;
      }
      .team-details-navigation {
        grid-column: 1 / -1;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class TeamDetailsComponent implements OnInit {
  team: Team | null = null;
  teamId: string = '';

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
      jiraGroupId: 'FE',
      memberCount: 5,
      projectCount: 3,
      description: 'The Frontend Team is responsible for developing and maintaining the user interface of our applications. They work closely with the Backend Team to ensure seamless integration of frontend and backend components.',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-06-20')
    };
  }

  goBack(): void {
    this.router.navigate(['/teams/list']);
  }

  editTeam(): void {
    // In a real application, this would navigate to an edit page
    console.log('Edit team with ID:', this.teamId);
  }
} 