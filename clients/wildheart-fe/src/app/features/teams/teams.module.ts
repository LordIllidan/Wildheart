import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamsComponent } from './teams.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamProjectsComponent } from './components/team-projects/team-projects.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TeamListComponent },
      { path: 'details/:id', component: TeamDetailsComponent },
      { path: 'members/:id', component: TeamMembersComponent },
      { path: 'projects/:id', component: TeamProjectsComponent }
    ]
  }
];

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
   
  ]
})
export class TeamsModule { } 