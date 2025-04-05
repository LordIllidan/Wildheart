import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],

  template: `
    <div class="settings-container">
      <h2>Security Settings</h2>
      
      <form [formGroup]="securityForm" (ngSubmit)="onSubmit()">
        <div class="form-section">
          <h3>Change Password</h3>
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input 
              id="currentPassword" 
              type="password" 
              formControlName="currentPassword"
              [class.error]="securityForm.get('currentPassword')?.touched && securityForm.get('currentPassword')?.invalid">
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input 
              id="newPassword" 
              type="password" 
              formControlName="newPassword"
              [class.error]="securityForm.get('newPassword')?.touched && securityForm.get('newPassword')?.invalid">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input 
              id="confirmPassword" 
              type="password" 
              formControlName="confirmPassword"
              [class.error]="securityForm.get('confirmPassword')?.touched && securityForm.get('confirmPassword')?.invalid">
          </div>
        </div>

        <div class="form-section">
          <h3>Two-Factor Authentication</h3>
          <div class="form-group">
            <label>
              <input type="checkbox" formControlName="twoFactorEnabled">
              Enable Two-Factor Authentication
            </label>
          </div>
        </div>

        <div class="form-section">
          <h3>Session Settings</h3>
          <div class="form-group">
            <label for="sessionTimeout">Session Timeout (minutes)</label>
            <input 
              id="sessionTimeout" 
              type="number" 
              formControlName="sessionTimeout"
              min="5"
              max="120">
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" formControlName="requireReauth">
              Require Re-authentication for Sensitive Actions
            </label>
          </div>
        </div>

        <button type="submit" [disabled]="!securityForm.valid">Save Changes</button>
      </form>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .form-section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #2D3748;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      color: #4A5568;
    }
    input[type="text"],
    input[type="password"],
    input[type="number"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    input.error {
      border-color: #E53E3E;
    }
    button {
      padding: 10px 20px;
      background-color: #5A67D8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #A0AEC0;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      background-color: #4C51BF;
    }
  `]
})
export class SecuritySettingsComponent implements OnInit {
  securityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      twoFactorEnabled: [false],
      sessionTimeout: [30, [Validators.required, Validators.min(5), Validators.max(120)]],
      requireReauth: [true]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    // TODO: Implement loading security settings from service
    const defaultSettings = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false,
      sessionTimeout: 30,
      requireReauth: true
    };
    
    this.securityForm.patchValue(defaultSettings);
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.securityForm.valid) {
      // TODO: Implement saving security settings to service
      console.log('Security settings submitted:', this.securityForm.value);
    }
  }
} 