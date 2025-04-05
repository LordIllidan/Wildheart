import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

import { SystemOverviewComponent } from './system-overview/system-overview.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { GlassDemoComponent } from '../glass-demo/glass-demo.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatChipsModule,
    RouterModule,
    SystemOverviewComponent,
    ProjectOverviewComponent,
    TeamOverviewComponent,
    ActivityFeedComponent,
    GlassDemoComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // TODO: Load dashboard data
  }
} 