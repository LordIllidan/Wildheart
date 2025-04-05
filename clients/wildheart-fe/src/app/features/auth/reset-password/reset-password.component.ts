import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Reset Password</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>New Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your new password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('minlength')">Password must be at least 8 characters</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirm New Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="confirmPassword" placeholder="Confirm your new password">
              <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('required')">Please confirm your password</mat-error>
              <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('passwordMismatch')">Passwords do not match</mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="resetPasswordForm.invalid">Reset Password</button>
              <button mat-button type="button" routerLink="/auth/login">Back to Login</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .auth-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }

    mat-card-header {
      justify-content: center;
      margin-bottom: 20px;
    }

    mat-card-title {
      font-size: 24px;
      margin: 0;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
  `]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      // TODO: Implement reset password logic
      console.log('Reset password form submitted', this.resetPasswordForm.value);
      this.snackBar.open('Password reset successful', 'Close', { duration: 3000 });
      this.router.navigate(['/auth/login']);
    }
  }
} 