import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { System, SystemStatus } from '../../../core/models/system.model';
import { SystemService } from '../../../core/services/system.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class SystemListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'namespace',
    'ipAddress',
    'isKubernetes',
    'project',
    'team',
    'status',
    'actions'
  ];
  dataSource = new MatTableDataSource<System>([]);
  isLoading = true;
  systemStatuses = Object.values(SystemStatus);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSystems();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSystems(): void {
    this.isLoading = true;
    this.systemService.getSystems().subscribe({
      next: (systems) => {
        this.dataSource.data = systems;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading systems', error);
        this.snackBar.open('Error loading systems', 'Close', {
          duration: 5000
        });
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewSystem(id: string): void {
    this.router.navigate(['/systems', id]);
  }

  editSystem(id: string): void {
    this.router.navigate(['/systems', id, 'edit']);
  }

  deleteSystem(id: string): void {
    if (confirm('Are you sure you want to delete this system?')) {
      this.systemService.deleteSystem(id).subscribe({
        next: () => {
          this.snackBar.open('System deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadSystems();
        },
        error: (error) => {
          console.error('Error deleting system', error);
          this.snackBar.open('Error deleting system', 'Close', {
            duration: 5000
          });
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
} 