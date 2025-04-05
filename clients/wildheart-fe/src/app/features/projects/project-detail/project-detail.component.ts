import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule
  ],
  template: `
    <div class="project-detail-container" *ngIf="project">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{project.name}}</mat-card-title>
          <div class="header-actions">
            <button mat-raised-button color="accent" [routerLink]="['/projects', project.id, 'edit']">
              <mat-icon>edit</mat-icon>
              Edit Project
            </button>
            <button mat-raised-button color="warn" (click)="deleteProject()">
              <mat-icon>delete</mat-icon>
              Delete Project
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="project-status">
            <mat-chip [color]="getStatusColor(project.status)" selected>
              {{project.status}}
            </mat-chip>
            <div class="progress-container">
              <mat-progress-bar mode="determinate" [value]="project.progress"></mat-progress-bar>
              <span class="progress-text">{{project.progress}}% Complete</span>
            </div>
          </div>

          <mat-tab-group>
            <mat-tab label="Overview">
              <div class="tab-content">
                <div class="info-section">
                  <h3>Project Details</h3>
                  <mat-list>
                    <mat-list-item>
                      <span class="label">Start Date:</span>
                      <span class="value">{{project.startDate | date}}</span>
                    </mat-list-item>
                    <mat-list-item>
                      <span class="label">End Date:</span>
                      <span class="value">{{project.endDate | date}}</span>
                    </mat-list-item>
                    <mat-list-item>
                      <span class="label">Description:</span>
                      <span class="value">{{project.description}}</span>
                    </mat-list-item>
                  </mat-list>
                </div>

                <mat-divider></mat-divider>

                <div class="info-section">
                  <h3>Team Members</h3>
                  <mat-list>
                    <mat-list-item *ngFor="let member of project.team">
                      <mat-icon matListItemIcon>person</mat-icon>
                      <div matListItemTitle>{{member.name}}</div>
                      <div matListItemLine>{{member.role}}</div>
                    </mat-list-item>
                  </mat-list>
                  <button mat-button color="primary" [routerLink]="['/projects', project.id, 'team']">
                    Manage Team
                  </button>
                </div>
              </div>
            </mat-tab>

            <mat-tab label="Systems">
              <div class="tab-content">
                <mat-list>
                  <mat-list-item *ngFor="let system of project.systems">
                    <mat-icon matListItemIcon>computer</mat-icon>
                    <div matListItemTitle>{{system.name}}</div>
                    <div matListItemLine>{{system.description}}</div>
                    <button mat-icon-button [routerLink]="['/systems', system.id]" color="primary">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </mat-list-item>
                </mat-list>
              </div>
            </mat-tab>

            <mat-tab label="Timeline">
              <div class="tab-content">
                <mat-list>
                  <mat-list-item *ngFor="let milestone of project.milestones">
                    <mat-icon matListItemIcon>flag</mat-icon>
                    <div matListItemTitle>{{milestone.name}}</div>
                    <div matListItemLine>Due: {{milestone.dueDate | date}}</div>
                    <mat-chip [color]="getMilestoneStatusColor(milestone.status)" selected>
                      {{milestone.status}}
                    </mat-chip>
                  </mat-list-item>
                </mat-list>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .project-detail-container {
      padding: 20px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .project-status {
      margin-bottom: 20px;
    }

    .progress-container {
      margin-top: 10px;
    }

    .progress-text {
      margin-left: 8px;
      font-size: 14px;
    }

    .tab-content {
      padding: 20px 0;
    }

    .info-section {
      margin-bottom: 20px;
    }

    .info-section h3 {
      margin-bottom: 10px;
      font-weight: 500;
    }

    .label {
      font-weight: 500;
      margin-right: 10px;
      min-width: 100px;
    }

    mat-chip {
      min-width: 80px;
      justify-content: center;
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.loadProject(projectId);
  }

  loadProject(id: string | null) {
    if (!id) {
      this.router.navigate(['/projects']);
      return;
    }

    // TODO: Replace with actual API call
    setTimeout(() => {
      this.project = {
        id: 1,
        name: 'Project X',
        status: 'In Progress',
        progress: 75,
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-06-30'),
        description: 'This is a detailed description of Project X. It outlines the goals, objectives, and expected outcomes of the project.',
        team: [
          { id: 1, name: 'John Doe', role: 'Project Manager' },
          { id: 2, name: 'Jane Smith', role: 'Developer' },
          { id: 3, name: 'Bob Johnson', role: 'Designer' }
        ],
        systems: [
          { id: 1, name: 'System A', description: 'Core system for Project X' },
          { id: 2, name: 'System B', description: 'Supporting system for Project X' }
        ],
        milestones: [
          { id: 1, name: 'Planning Phase', dueDate: new Date('2023-02-15'), status: 'Completed' },
          { id: 2, name: 'Development Phase', dueDate: new Date('2023-04-30'), status: 'In Progress' },
          { id: 3, name: 'Testing Phase', dueDate: new Date('2023-05-15'), status: 'Not Started' },
          { id: 4, name: 'Deployment', dueDate: new Date('2023-06-30'), status: 'Not Started' }
        ]
      };
    }, 1000);
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'primary';
      case 'in progress':
        return 'accent';
      case 'planning':
        return 'warn';
      case 'on hold':
        return '';
      default:
        return '';
    }
  }

  getMilestoneStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'primary';
      case 'in progress':
        return 'accent';
      case 'not started':
        return 'warn';
      default:
        return '';
    }
  }

  deleteProject() {
    const dialogRef = this.dialog.open(MatDialog, {
      width: '400px',
      data: { title: 'Delete Project', message: `Are you sure you want to delete ${this.project.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Implement delete API call
        this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/projects']);
      }
    });
  }
} 