import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

interface NotificationType {
  id: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-notification-settings',
  template: `
    <div class="settings-container">
      <h2>Notification Settings</h2>
      <form [formGroup]="notificationForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="enableAll">
            Enable All Notifications
          </label>
        </div>

        <div class="notification-types">
          <div class="notification-type" *ngFor="let type of notificationTypes">
            <div class="notification-header">
              <label>
                <input type="checkbox" [formControlName]="type.id">
                {{type.label}}
              </label>
            </div>
            <p class="description">{{type.description}}</p>
          </div>
        </div>

        <div class="form-group">
          <label for="emailNotifications">Email Notifications</label>
          <select id="emailNotifications" formControlName="emailNotifications">
            <option value="all">All Notifications</option>
            <option value="important">Important Only</option>
            <option value="none">None</option>
          </select>
        </div>

        <div class="form-group">
          <label for="pushNotifications">Push Notifications</label>
          <select id="pushNotifications" formControlName="pushNotifications">
            <option value="all">All Notifications</option>
            <option value="important">Important Only</option>
            <option value="none">None</option>
          </select>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .notification-types {
      margin: 20px 0;
    }
    .notification-type {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .notification-header {
      margin-bottom: 5px;
    }
    .description {
      color: #666;
      font-size: 0.9em;
      margin: 5px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #5A67D8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #4C51BF;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ]
})
export class NotificationSettingsComponent implements OnInit {
  notificationForm: FormGroup;
  notificationTypes: NotificationType[] = [
    {
      id: 'systemUpdates',
      label: 'System Updates',
      description: 'Receive notifications about system updates and maintenance'
    },
    {
      id: 'projectUpdates',
      label: 'Project Updates',
      description: 'Get notified about changes in your projects'
    },
    {
      id: 'taskAssignments',
      label: 'Task Assignments',
      description: 'Receive notifications when tasks are assigned to you'
    },
    {
      id: 'comments',
      label: 'Comments',
      description: 'Get notified about new comments on your tasks and projects'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.notificationForm = this.fb.group({
      enableAll: [true],
      systemUpdates: [true],
      projectUpdates: [true],
      taskAssignments: [true],
      comments: [true],
      emailNotifications: ['all'],
      pushNotifications: ['all']
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    // TODO: Implement loading notification settings from service
    const defaultSettings = {
      enableAll: true,
      systemUpdates: true,
      projectUpdates: true,
      taskAssignments: true,
      comments: true,
      emailNotifications: 'all',
      pushNotifications: 'all'
    };
    
    this.notificationForm.patchValue(defaultSettings);
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      // TODO: Implement saving notification settings to service
      console.log('Notification settings submitted:', this.notificationForm.value);
    }
  }
} 