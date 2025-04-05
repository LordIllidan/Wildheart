import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface ReportType {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-report-generator',
  template: `
    <div class="report-container">
      <h2>Report Generator</h2>
      
      <form [formGroup]="reportForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="reportType">Report Type</label>
          <select id="reportType" formControlName="reportType">
            <option value="">Select a report type</option>
            <option *ngFor="let type of reportTypes" [value]="type.id">
              {{type.name}}
            </option>
          </select>
          <div class="description" *ngIf="selectedReportType">
            {{selectedReportType.description}}
          </div>
        </div>

        <div class="form-group">
          <label for="dateRange">Date Range</label>
          <div class="date-range">
            <input 
              id="startDate" 
              type="date" 
              formControlName="startDate"
              placeholder="Start Date">
            <span>to</span>
            <input 
              id="endDate" 
              type="date" 
              formControlName="endDate"
              placeholder="End Date">
          </div>
        </div>

        <div class="form-group">
          <label for="format">Export Format</label>
          <select id="format" formControlName="format">
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="includeCharts">
            Include Charts
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="includeRawData">
            Include Raw Data
          </label>
        </div>

        <div class="form-actions">
          <button type="button" (click)="previewReport()" [disabled]="!reportForm.valid">
            Preview
          </button>
          <button type="submit" [disabled]="!reportForm.valid">
            Generate Report
          </button>
        </div>
      </form>

      <div class="preview-container" *ngIf="showPreview">
        <h3>Report Preview</h3>
        <div class="preview-content">
          <!-- Preview content will be displayed here -->
          <p>Preview of the report will be shown here.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .report-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    select, input[type="date"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .date-range {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .date-range input {
      flex: 1;
    }
    .date-range span {
      color: #666;
    }
    .description {
      margin-top: 5px;
      color: #666;
      font-size: 0.9em;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    button[type="submit"] {
      background-color: #5A67D8;
      color: white;
    }
    button[type="button"] {
      background-color: #E2E8F0;
      color: #4A5568;
    }
    button:disabled {
      background-color: #A0AEC0;
      cursor: not-allowed;
    }
    .preview-container {
      margin-top: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .preview-content {
      min-height: 200px;
      padding: 20px;
      background-color: #F7FAFC;
      border-radius: 4px;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class ReportGeneratorComponent implements OnInit {
  reportForm: FormGroup;
  showPreview = false;
  selectedReportType: ReportType | null = null;
  
  reportTypes: ReportType[] = [
    {
      id: 'system-status',
      name: 'System Status Report',
      description: 'Overview of system health, performance metrics, and status'
    },
    {
      id: 'project-progress',
      name: 'Project Progress Report',
      description: 'Detailed progress of projects, tasks, and milestones'
    },
    {
      id: 'user-activity',
      name: 'User Activity Report',
      description: 'User login activity, actions, and system usage'
    },
    {
      id: 'error-logs',
      name: 'Error Logs Report',
      description: 'System errors, warnings, and exceptions'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      reportType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      format: ['pdf', Validators.required],
      includeCharts: [true],
      includeRawData: [false]
    });
  }

  ngOnInit(): void {
    // Subscribe to report type changes to update the selected report type
    this.reportForm.get('reportType')?.valueChanges.subscribe(value => {
      this.selectedReportType = this.reportTypes.find(type => type.id === value) || null;
    });
  }

  previewReport(): void {
    if (this.reportForm.valid) {
      this.showPreview = true;
      // TODO: Implement report preview logic
      console.log('Preview report with settings:', this.reportForm.value);
    }
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      // TODO: Implement report generation logic
      console.log('Generate report with settings:', this.reportForm.value);
    }
  }
} 