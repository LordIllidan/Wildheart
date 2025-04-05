import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { System, SystemStatus } from '../../../core/models/system.model';
import { SystemService } from '../../../core/services/system.service';
import { ProjectService } from '../../../core/services/project.service';
import { TeamService } from '../../../core/services/team.service';
import { Project } from '../../../core/models/project.model';
import { Team } from '../../../core/models/team.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-system-form',
  templateUrl: './system-form.component.html',
  styleUrls: ['./system-form.component.scss'],
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
    MatCardModule
  ]
})
export class SystemFormComponent implements OnInit {
  systemForm: FormGroup;
  isEditMode = false;
  systemId: string | null = null;
  isLoading = false;
  systemStatuses = Object.values(SystemStatus);
  projects: Project[] = [];
  teams: Team[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private systemService: SystemService,
    private projectService: ProjectService,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {
    this.systemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      namespace: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)]],
      isKubernetes: [false],
      status: [SystemStatus.Active, Validators.required],
      description: [''],
      projectId: [''],
      teamId: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadTeams();
    
    this.systemId = this.route.snapshot.paramMap.get('id');
    if (this.systemId) {
      this.isEditMode = true;
      this.loadSystem(this.systemId);
    }
  }

  loadSystem(id: string): void {
    this.isLoading = true;
    this.systemService.getSystemById(id).subscribe({
      next: (system) => {
        this.systemForm.patchValue({
          name: system.name,
          namespace: system.namespace,
          ipAddress: system.ipAddress,
          isKubernetes: system.isKubernetes,
          status: system.status,
          description: system.description,
          projectId: system.project?.id || '',
          teamId: system.team?.id || ''
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading system', error);
        this.snackBar.open('Error loading system', 'Close', { duration: 5000 });
        this.isLoading = false;
        this.router.navigate(['/systems']);
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error loading projects', error);
        this.snackBar.open('Error loading projects', 'Close', { duration: 5000 });
      }
    });
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe({
      next: (teams) => {
        this.teams = teams;
      },
      error: (error) => {
        console.error('Error loading teams', error);
        this.snackBar.open('Error loading teams', 'Close', { duration: 5000 });
      }
    });
  }

  onSubmit(): void {
    if (this.systemForm.invalid) {
      return;
    }

    this.isLoading = true;
    const systemData = this.systemForm.value;

    if (this.isEditMode && this.systemId) {
      this.systemService.updateSystem(this.systemId, systemData).subscribe({
        next: () => {
          this.snackBar.open('System updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/systems', this.systemId]);
        },
        error: (error) => {
          console.error('Error updating system', error);
          this.snackBar.open('Error updating system', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    } else {
      this.systemService.createSystem(systemData).subscribe({
        next: (newSystem) => {
          this.snackBar.open('System created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/systems', newSystem.id]);
        },
        error: (error) => {
          console.error('Error creating system', error);
          this.snackBar.open('Error creating system', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.systemId) {
      this.router.navigate(['/systems', this.systemId]);
    } else {
      this.router.navigate(['/systems']);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.systemForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Invalid IP address format';
      }
    }
    return '';
  }
} 