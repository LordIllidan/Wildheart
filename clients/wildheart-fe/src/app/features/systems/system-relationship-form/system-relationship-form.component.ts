import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SystemService } from '../../../core/services/system.service';
import { System } from '../../../core/models/system.model';
import { SystemRelationship, RelationshipType } from '../../../core/models/system-relationship.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-system-relationship-form',
  templateUrl: './system-relationship-form.component.html',
  styleUrls: ['./system-relationship-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ]
})
export class SystemRelationshipFormComponent implements OnInit {
  relationshipForm: FormGroup;
  isLoading = false;
  systems: System[] = [];
  relationshipTypes = Object.values(RelationshipType);
  sourceSystemId: string;

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SystemRelationshipFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { systemId: string }
  ) {
    this.sourceSystemId = data.systemId;
    this.relationshipForm = this.fb.group({
      sourceSystemId: [this.sourceSystemId, Validators.required],
      targetSystemId: ['', Validators.required],
      type: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadSystems();
  }

  loadSystems(): void {
    this.isLoading = true;
    this.systemService.getSystems().subscribe({
      next: (systems) => {
        // Filter out the current system from the target systems list
        this.systems = systems.filter(system => system.id !== this.sourceSystemId);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading systems', error);
        this.snackBar.open('Error loading systems', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.relationshipForm.invalid) {
      return;
    }

    this.isLoading = true;
    const relationshipData = this.relationshipForm.value;

    this.systemService.createRelationship(
      relationshipData.sourceSystemId,
      relationshipData.targetSystemId,
      relationshipData.type
    ).subscribe({
      next: (relationship) => {
        this.snackBar.open('Relationship created successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(relationship);
      },
      error: (error) => {
        console.error('Error creating relationship', error);
        this.snackBar.open('Error creating relationship', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.relationshipForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
    }
    return '';
  }
} 