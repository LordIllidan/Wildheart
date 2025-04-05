import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-project-team',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    RouterModule
  ],
  template: `
    <div class="project-team-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Project Team</mat-card-title>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="openAddMemberDialog()">
              <mat-icon>person_add</mat-icon>
              Add Team Member
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="teamMembers" matSort>
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let member">{{member.name}}</td>
              </ng-container>

              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
                <td mat-cell *matCellDef="let member">
                  <mat-chip [color]="getRoleColor(member.role)" selected>
                    {{member.role}}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                <td mat-cell *matCellDef="let member">{{member.email}}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let member">
                  <mat-chip [color]="getStatusColor(member.status)" selected>
                    {{member.status}}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let member">
                  <button mat-icon-button color="primary" (click)="editMember(member)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="removeMember(member)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of team members">
            </mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .project-team-container {
      padding: 20px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
    }

    mat-chip {
      min-width: 80px;
      justify-content: center;
    }

    .mat-column-actions {
      width: 100px;
      text-align: center;
    }
  `]
})
export class ProjectTeamComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'email', 'status', 'actions'];
  teamMembers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.loadTeamMembers(projectId);
  }

  loadTeamMembers(projectId: string | null) {
    if (!projectId) {
      this.router.navigate(['/projects']);
      return;
    }

    // TODO: Replace with actual API call
    setTimeout(() => {
      this.teamMembers = [
        {
          id: 1,
          name: 'John Doe',
          role: 'Project Manager',
          email: 'john.doe@example.com',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Jane Smith',
          role: 'Developer',
          email: 'jane.smith@example.com',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Bob Johnson',
          role: 'Designer',
          email: 'bob.johnson@example.com',
          status: 'Inactive'
        }
      ];
    }, 1000);
  }

  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'project manager':
        return 'primary';
      case 'developer':
        return 'accent';
      case 'designer':
        return 'warn';
      default:
        return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'primary';
      case 'inactive':
        return 'warn';
      default:
        return '';
    }
  }

  openAddMemberDialog() {
    // TODO: Implement add member dialog
    this.snackBar.open('Add member functionality coming soon', 'Close', { duration: 3000 });
  }

  editMember(member: any) {
    // TODO: Implement edit member dialog
    this.snackBar.open('Edit member functionality coming soon', 'Close', { duration: 3000 });
  }

  removeMember(member: any) {
    const dialogRef = this.dialog.open(MatDialog, {
      width: '400px',
      data: { title: 'Remove Team Member', message: `Are you sure you want to remove ${member.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Implement remove API call
        this.snackBar.open('Team member removed successfully', 'Close', { duration: 3000 });
      }
    });
  }
} 