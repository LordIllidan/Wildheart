import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SystemListComponent } from './system-list/system-list.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';
import { SystemFormComponent } from './system-form/system-form.component';
import { SystemRelationshipFormComponent } from './system-relationship-form/system-relationship-form.component';

const routes: Routes = [
  { path: '', component: SystemListComponent },
  { path: 'new', component: SystemFormComponent },
  { path: ':id', component: SystemDetailComponent },
  { path: ':id/edit', component: SystemFormComponent }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
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
    MatDividerModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule
  ]
})
export class SystemsModule { } 