import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

interface Activity {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description: string;
  time: string;
  link?: string;
}

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    MatMenuModule
  ]
})
export class ActivityFeedComponent implements OnInit {
  activities: Activity[] = [
    {
      id: '1',
      type: 'success',
      title: 'System Update Completed',
      description: 'Successfully deployed new features to production environment',
      time: '2 hours ago',
      link: '/systems/1'
    },
    {
      id: '2',
      type: 'warning',
      title: 'High CPU Usage',
      description: 'Server CPU usage exceeded 80% threshold',
      time: '4 hours ago',
      link: '/systems/2'
    },
    {
      id: '3',
      type: 'info',
      title: 'New Team Member',
      description: 'John Doe joined the Development Team',
      time: '1 day ago',
      link: '/teams/1'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  getActivityIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }

  getActivityTypeClass(type: string): string {
    return type;
  }
} 