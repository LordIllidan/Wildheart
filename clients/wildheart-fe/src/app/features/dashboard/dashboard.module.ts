import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardComponent } from './dashboard.component';
import { SystemOverviewComponent } from './system-overview/system-overview.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class DashboardModule { } 