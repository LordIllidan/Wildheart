import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

interface ThemeOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-application-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="settings-container">
      <h2>Application Settings</h2>
      <form [formGroup]="appSettingsForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="theme">Theme</label>
          <select id="theme" formControlName="theme">
            <option *ngFor="let theme of themes" [value]="theme.value">
              {{theme.label}}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="language">Language</label>
          <select id="language" formControlName="language">
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </div>
        <div class="form-group">
          <label for="notifications">Enable Notifications</label>
          <input type="checkbox" id="notifications" formControlName="notifications">
        </div>
        <div class="form-group">
          <label for="autoSave">Auto Save</label>
          <input type="checkbox" id="autoSave" formControlName="autoSave">
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
    label {
      display: block;
      margin-bottom: 5px;
    }
    select, input[type="text"] {
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
  `]
})
export class ApplicationSettingsComponent implements OnInit {
  appSettingsForm: FormGroup;
  themes: ThemeOption[] = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'system', label: 'System Default' }
  ];

  constructor(private fb: FormBuilder) {
    this.appSettingsForm = this.fb.group({
      theme: ['light'],
      language: ['en'],
      notifications: [true],
      autoSave: [true]
    });
  }

  ngOnInit(): void {
    // TODO: Load application settings from service
    this.loadSettings();
  }

  private loadSettings(): void {
    // TODO: Implement loading settings from service
    const defaultSettings = {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true
    };
    
    this.appSettingsForm.patchValue(defaultSettings);
  }

  onSubmit(): void {
    if (this.appSettingsForm.valid) {
      // TODO: Implement saving settings to service
      console.log('Settings submitted:', this.appSettingsForm.value);
    }
  }
} 