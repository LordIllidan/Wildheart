import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterModule
  ],
  template: `
    <div class="project-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{isEditMode ? 'Edit Project' : 'Create Project'}}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Project Name</mat-label>
                <input matInput formControlName="name" placeholder="Enter project name">
                <mat-error *ngIf="projectForm.get('name')?.hasError('required')">
                  Project name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="planning">Planning</mat-option>
                  <mat-option value="in progress">In Progress</mat-option>
                  <mat-option value="on hold">On Hold</mat-option>
                  <mat-option value="completed">Completed</mat-option>
                </mat-select>
                <mat-error *ngIf="projectForm.get('status')?.hasError('required')">
                  Status is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Start Date</mat-label>
                <input matInput [matDatepicker]="startPicker" formControlName="startDate">
                <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                <mat-datepicker #startPicker></mat-datepicker>
                <mat-error *ngIf="projectForm.get('startDate')?.hasError('required')">
                  Start date is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>End Date</mat-label>
                <input matInput [matDatepicker]="endPicker" formControlName="endDate">
                <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                <mat-datepicker #endPicker></mat-datepicker>
                <mat-error *ngIf="projectForm.get('endDate')?.hasError('required')">
                  End date is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="4" 
                  placeholder="Enter project description"></textarea>
                <mat-error *ngIf="projectForm.get('description')?.hasError('required')">
                  Description is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" [routerLink]="['/projects']">Cancel</button>
              <button mat-raised-button color="primary" type="submit" 
                [disabled]="projectForm.invalid || isSubmitting">
                {{isEditMode ? 'Update' : 'Create'}} Project
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .project-form-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    mat-card-header {
      margin-bottom: 20px;
    }

    .form-row {
      margin-bottom: 20px;
    }

    mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
  `]
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      status: ['planning', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.isEditMode = true;
      this.loadProject(projectId);
    }
  }

  loadProject(id: string) {
    // TODO: Replace with actual API call
    setTimeout(() => {
      const project = {
        name: 'Project X',
        status: 'in progress',
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-06-30'),
        description: 'This is a detailed description of Project X.'
      };
      this.projectForm.patchValue(project);
    }, 1000);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.isSubmitting = true;
      // TODO: Replace with actual API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.snackBar.open(
          `Project ${this.isEditMode ? 'updated' : 'created'} successfully`,
          'Close',
          { duration: 3000 }
        );
        this.router.navigate(['/projects']);
      }, 1000);
    }
  }
} 