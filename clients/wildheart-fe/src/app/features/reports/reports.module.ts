import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ReportGeneratorComponent } from './components/report-generator/report-generator.component';
import { ReportTemplatesComponent } from './components/report-templates/report-templates.component';
import { ReportHistoryComponent } from './components/report-history/report-history.component';
import { ExportOptionsComponent } from './components/export-options/export-options.component';
import { ReportsNavComponent } from './components/reports-nav/reports-nav.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: '', redirectTo: 'generator', pathMatch: 'full' },
      { path: 'generator', component: ReportGeneratorComponent },
      { path: 'templates', component: ReportTemplatesComponent },
      { path: 'history', component: ReportHistoryComponent }
    ]
  }
];

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
   
  ]
})
export class ReportsModule { } 