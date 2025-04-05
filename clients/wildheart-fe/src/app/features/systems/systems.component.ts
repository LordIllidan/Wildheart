import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface System {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdated: Date;
}

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule]
})
export class SystemsComponent implements OnInit {
  systems: System[] = [];

  ngOnInit() {
    // Mock data - replace with actual API call
    this.systems = [
      {
        name: 'Production Server',
        status: 'online',
        lastUpdated: new Date()
      },
      {
        name: 'Development Environment',
        status: 'maintenance',
        lastUpdated: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        name: 'Backup System',
        status: 'offline',
        lastUpdated: new Date(Date.now() - 7200000) // 2 hours ago
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

  getStatusIcon(status: System['status']): string {
    switch (status) {
      case 'online':
        return 'check_circle';
      case 'offline':
        return 'error';
      case 'maintenance':
        return 'build';
      default:
        return '';
    }
  }
} 