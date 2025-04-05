import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { System, SystemStatus } from '../../../core/models/system.model';
import { SystemService } from '../../../core/services/system.service';
import { SystemRelationship } from '../../../core/models/system-relationship.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChip } from '@angular/material/chips';  
@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule,
    MatTabsModule,
    MatChip
  ]
})
export class SystemDetailComponent implements OnInit {
  system: System | null = null;
  relationships: SystemRelationship[] = [];
  isLoading = true;
  systemStatuses = Object.values(SystemStatus);
  activeTab = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSystem(id);
    } else {
      this.snackBar.open('System ID not found', 'Close', { duration: 3000 });
      this.router.navigate(['/systems']);
    }
  }

  loadSystem(id: string): void {
    this.isLoading = true;
    this.systemService.getSystemById(id).subscribe({
      next: (system) => {
        this.system = system;
        this.loadRelationships(id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading system', error);
        this.snackBar.open('Error loading system details', 'Close', { duration: 5000 });
        this.isLoading = false;
        this.router.navigate(['/systems']);
      }
    });
  }

  loadRelationships(systemId: string): void {
    this.systemService.getSystemRelationships(systemId).subscribe({
      next: (relationships) => {
        this.relationships = relationships;
      },
      error: (error) => {
        console.error('Error loading relationships', error);
        this.snackBar.open('Error loading system relationships', 'Close', { duration: 5000 });
      }
    });
  }

  editSystem(): void {
    if (this.system) {
      this.router.navigate(['/systems', this.system.id, 'edit']);
    }
  }

  deleteSystem(): void {
    if (this.system && confirm('Are you sure you want to delete this system?')) {
      this.systemService.deleteSystem(this.system.id).subscribe({
        next: () => {
          this.snackBar.open('System deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/systems']);
        },
        error: (error) => {
          console.error('Error deleting system', error);
          this.snackBar.open('Error deleting system', 'Close', { duration: 5000 });
        }
      });
    }
  }

  getStatusColor(status: SystemStatus): string {
    switch (status) {
      case SystemStatus.Active:
        return 'accent';
      case SystemStatus.Inactive:
        return 'warn';
      case SystemStatus.Maintenance:
        return 'primary';
      case SystemStatus.Deprecated:
        return 'warn';
      default:
        return '';
    }
  }

  openRelationshipForm(): void {
    // This will be implemented when we create the SystemRelationshipFormComponent
    // this.dialog.open(SystemRelationshipFormComponent, {
    //   width: '500px',
    //   data: { systemId: this.system?.id }
    // });
  }

  deleteRelationship(relationshipId: string): void {
    if (confirm('Are you sure you want to delete this relationship?')) {
      this.systemService.deleteRelationship(relationshipId).subscribe({
        next: () => {
          this.snackBar.open('Relationship deleted successfully', 'Close', { duration: 3000 });
          if (this.system) {
            this.loadRelationships(this.system.id);
          }
        },
        error: (error) => {
          console.error('Error deleting relationship', error);
          this.snackBar.open('Error deleting relationship', 'Close', { duration: 5000 });
        }
      });
    }
  }
} 