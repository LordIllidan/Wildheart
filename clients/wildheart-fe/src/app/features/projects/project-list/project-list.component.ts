import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'progress', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<any>;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(null, null, null, null);
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort as MatSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadProjects() {
    this.isLoading = true;
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.dataSource.data = [
        { id: 1, name: 'Project X', status: 'In Progress', progress: 75, startDate: new Date('2023-01-15'), endDate: new Date('2023-06-30') },
        { id: 2, name: 'Project Y', status: 'Completed', progress: 100, startDate: new Date('2023-02-01'), endDate: new Date('2023-05-15') },
        { id: 3, name: 'Project Z', status: 'Planning', progress: 25, startDate: new Date('2023-03-10'), endDate: new Date('2023-08-20') },
        { id: 4, name: 'Project A', status: 'On Hold', progress: 50, startDate: new Date('2023-04-05'), endDate: new Date('2023-09-10') }
      ];
      this.isLoading = false;
    }, 1000);
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'primary';
      case 'in progress':
        return 'accent';
      case 'planning':
        return 'warn';
      case 'on hold':
        return '';
      default:
        return '';
    }
  }

  deleteProject(project: any) {
    const dialogRef = this.dialog.open(MatDialog, {
      width: '400px',
      data: { title: 'Delete Project', message: `Are you sure you want to delete ${project.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Implement delete API call
        this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
        this.loadProjects();
      }
    });
  }
} 