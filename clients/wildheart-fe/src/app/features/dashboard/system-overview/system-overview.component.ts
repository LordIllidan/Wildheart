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

interface System {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  project: string;
}

@Component({
  selector: 'app-system-overview',
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
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.scss']
})
export class SystemOverviewComponent implements OnInit {
  systems: System[] = [];
  displayedColumns: string[] = ['name', 'status', 'project', 'actions'];

  constructor() { }

  ngOnInit(): void {
    // Mock data - replace with actual API call
    this.systems = [
      {
        id: 1,
        name: 'Production Server',
        status: 'online',
        project: 'E-commerce Platform'
      },
      {
        id: 2,
        name: 'Development Environment',
        status: 'maintenance',
        project: 'Mobile App'
      },
      {
        id: 3,
        name: 'Backup System',
        status: 'offline',
        project: 'Data Warehouse'
      },
      {
        id: 4,
        name: 'Testing Server',
        status: 'online',
        project: 'QA Environment'
      },
      {
        id: 5,
        name: 'Staging Server',
        status: 'online',
        project: 'Web Application'
      }
    ];
  }

  getStatusColor(status: System['status']): string {
    switch (status) {
      case 'online':
        return 'accent';
      case 'offline':
        return 'warn';
      case 'maintenance':
        return 'primary';
      default:
        return '';
    }
  }
} 