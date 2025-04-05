import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-settings',
  template: `
    <div class="settings-container">
      <h2>User Settings</h2>
      <form [formGroup]="userSettingsForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input id="firstName" type="text" formControlName="firstName">
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input id="lastName" type="text" formControlName="lastName">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
        </div>
        <div class="form-group">
          <label for="login">Login</label>
          <input id="login" type="text" formControlName="login">
        </div>
        <button type="submit" [disabled]="!userSettingsForm.valid">Save Changes</button>
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
    input {
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
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class UserSettingsComponent implements OnInit {
  userSettingsForm: FormGroup;
  currentUser?: User;

  constructor(private fb: FormBuilder) {
    this.userSettingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // TODO: Load current user data from service
    this.loadUserData();
  }

  private loadUserData(): void {
    // TODO: Implement loading user data from service
    this.currentUser = {
      id: '',
      login: '',
      firstName: '',
      lastName: '',
      email: '',
      roles: []
    };
    
    this.userSettingsForm.patchValue(this.currentUser);
  }

  onSubmit(): void {
    if (this.userSettingsForm.valid) {
      // TODO: Implement saving user data to service
      console.log('Form submitted:', this.userSettingsForm.value);
    }
  }
} 