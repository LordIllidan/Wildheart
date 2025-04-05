import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold';
  startDate: Date;
  endDate?: Date;
  progress: number;
}

interface Team {
  id: string;
  name: string;
  jiraGroupId: string;
}

@Component({
  selector: 'app-team-projects',
  template: `
    <div class="team-projects-container">
      <div class="team-projects-header">
        <div class="team-projects-title">
          <h1>{{ team?.name }} - Projects</h1>
          <span class="team-id">ID: {{ team?.id }}</span>
        </div>
        <div class="team-projects-actions">
          <button class="btn-secondary" (click)="goBack()">Back to Team</button>
          <button class="btn-primary" (click)="addProject()">Add Project</button>
        </div>
      </div>

      <div class="team-projects-content">
        <div class="team-projects-filters">
          <input 
            type="text" 
            placeholder="Search projects..." 
            [(ngModel)]="searchTerm"
            (input)="filterProjects()"
            class="search-input"
          >
          <div class="filter-options">
            <select [(ngModel)]="statusFilter" (change)="filterProjects()">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>

        <div class="projects-grid">
          <div *ngFor="let project of filteredProjects" class="project-card">
            <div class="project-card-header">
              <h3>{{ project.name }}</h3>
              <span class="project-status" [ngClass]="'status-' + project.status.toLowerCase()">
                {{ project.status }}
              </span>
            </div>
            <div class="project-card-body">
              <p class="project-description">{{ project.description }}</p>
              <div class="project-dates">
                <div class="date-item">
                  <span class="date-label">Start:</span>
                  <span class="date-value">{{ project.startDate | date:'mediumDate' }}</span>
                </div>
                <div class="date-item" *ngIf="project.endDate">
                  <span class="date-label">End:</span>
                  <span class="date-value">{{ project.endDate | date:'mediumDate' }}</span>
                </div>
              </div>
              <div class="project-progress">
                <div class="progress-label">
                  <span>Progress</span>
                  <span>{{ project.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="project.progress"></div>
                </div>
              </div>
            </div>
            <div class="project-card-footer">
              <button class="btn-icon" (click)="viewProject(project.id)">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn-icon" (click)="editProject(project.id)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-icon" (click)="deleteProject(project.id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div *ngIf="filteredProjects.length === 0" class="no-results">
            No projects found
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-projects-container {
      padding: 20px;
    }
    .team-projects-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .team-projects-title {
      display: flex;
      flex-direction: column;
    }
    .team-id {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }
    .team-projects-actions {
      display: flex;
      gap: 10px;
    }
    .team-projects-filters {
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
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .project-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .project-card-header {
      padding: 15px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .project-card-header h3 {
      margin: 0;
      font-size: 18px;
    }
    .project-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .status-active {
      background-color: #C6F6D5;
      color: #2F855A;
    }
    .status-completed {
      background-color: #B2F5EA;
      color: #319795;
    }
    .status-on-hold {
      background-color: #FED7D7;
      color: #C53030;
    }
    .project-card-body {
      padding: 15px;
      flex-grow: 1;
    }
    .project-description {
      margin: 0 0 15px 0;
      color: #4A5568;
      line-height: 1.5;
    }
    .project-dates {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 15px;
    }
    .date-item {
      display: flex;
      justify-content: space-between;
    }
    .date-label {
      color: #718096;
      font-size: 14px;
    }
    .date-value {
      font-weight: 500;
      font-size: 14px;
    }
    .project-progress {
      margin-top: 15px;
    }
    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 14px;
    }
    .progress-bar {
      height: 8px;
      background-color: #E2E8F0;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background-color: #5A67D8;
      border-radius: 4px;
    }
    .project-card-footer {
      padding: 15px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
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
      grid-column: 1 / -1;
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
export class TeamProjectsComponent implements OnInit {
  team: Team | null = null;
  teamId: string = '';
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm: string = '';
  statusFilter: string = '';

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
    
    this.projects = [
      { 
        id: '1', 
        name: 'Website Redesign', 
        description: 'Complete redesign of the company website with modern UI/UX principles.', 
        status: 'Active', 
        startDate: new Date('2023-01-10'), 
        endDate: new Date('2023-06-30'), 
        progress: 65 
      },
      { 
        id: '2', 
        name: 'Mobile App Development', 
        description: 'Development of a mobile application for iOS and Android platforms.', 
        status: 'Active', 
        startDate: new Date('2023-03-15'), 
        endDate: new Date('2023-09-30'), 
        progress: 35 
      },
      { 
        id: '3', 
        name: 'E-commerce Platform', 
        description: 'Implementation of an e-commerce platform with payment integration.', 
        status: 'Completed', 
        startDate: new Date('2022-10-01'), 
        endDate: new Date('2023-02-28'), 
        progress: 100 
      },
      { 
        id: '4', 
        name: 'Dashboard Analytics', 
        description: 'Creation of a dashboard for data visualization and analytics.', 
        status: 'On Hold', 
        startDate: new Date('2023-04-01'), 
        endDate: new Date('2023-07-31'), 
        progress: 20 
      }
    ];
    
    this.filteredProjects = [...this.projects];
  }

  filterProjects(): void {
    let filtered = [...this.projects];
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (this.statusFilter) {
      filtered = filtered.filter(project => project.status === this.statusFilter);
    }
    
    this.filteredProjects = filtered;
  }

  goBack(): void {
    this.router.navigate(['/teams/details', this.teamId]);
  }

  addProject(): void {
    // In a real application, this would open a modal or navigate to a form
    console.log('Add new project to team:', this.teamId);
  }

  viewProject(id: string): void {
    // In a real application, this would navigate to a project details page
    console.log('View project with ID:', id);
  }

  editProject(id: string): void {
    // In a real application, this would open a modal or navigate to a form
    console.log('Edit project with ID:', id);
  }

  deleteProject(id: string): void {
    // In a real application, this would show a confirmation dialog
    console.log('Delete project with ID:', id);
  }
} 