import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
}

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatChipsModule,
    RouterModule,
    MatMenuModule
  ],
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'progress', 'actions'];
  projects: Project[] = [];

  constructor() { }

  ngOnInit(): void {
    // Mock data - replace with actual API call
    this.projects = [
      {
        id: 1,
        name: 'E-commerce Platform',
        status: 'active',
        progress: 75
      },
      {
        id: 2,
        name: 'Mobile App',
        status: 'on-hold',
        progress: 30
      },
      {
        id: 3,
        name: 'Data Warehouse',
        status: 'completed',
        progress: 100
      },
      {
        id: 4,
        name: 'QA Environment',
        status: 'active',
        progress: 60
      },
      {
        id: 5,
        name: 'Web Application',
        status: 'active',
        progress: 85
      }
    ];
  }

  getStatusColor(status: Project['status']): string {
    switch (status) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'accent';
      case 'on-hold':
        return 'warn';
      default:
        return '';
    }
  }
} 