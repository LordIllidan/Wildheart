import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ApplicationSettingsComponent } from './components/application-settings/application-settings.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user', component: UserSettingsComponent },
      { path: 'application', component: ApplicationSettingsComponent },
      { path: 'notifications', component: NotificationSettingsComponent },
      { path: 'security', component: SecuritySettingsComponent },
      { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { } 