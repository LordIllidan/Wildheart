import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeRawData: boolean;
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  password?: string;
}

@Component({
  selector: 'app-export-options',
  template: `
    <div class="export-options-container">
      <h3>Export Options</h3>
      
      <form [formGroup]="exportForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="format">Export Format</label>
          <select id="format" formControlName="format">
            <option value="pdf">PDF Document</option>
            <option value="excel">Excel Spreadsheet</option>
            <option value="csv">CSV File</option>
          </select>
        </div>

        <div class="form-group">
          <label for="compressionLevel">Compression Level</label>
          <select id="compressionLevel" formControlName="compressionLevel">
            <option value="none">No Compression</option>
            <option value="low">Low (Faster)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="high">High (Smaller File)</option>
          </select>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" formControlName="includeCharts">
            Include Charts and Graphs
          </label>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" formControlName="includeRawData">
            Include Raw Data
          </label>
        </div>

        <div class="form-group" *ngIf="exportForm.get('format')?.value === 'pdf'">
          <label for="password">Password Protection (Optional)</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            placeholder="Enter password to protect the file">
        </div>

        <div class="preview-info" *ngIf="exportForm.valid">
          <h4>Export Preview</h4>
          <div class="preview-details">
            <p>Format: {{exportForm.get('format')?.value | uppercase}}</p>
            <p>Compression: {{exportForm.get('compressionLevel')?.value}}</p>
            <p>Charts: {{exportForm.get('includeCharts')?.value ? 'Included' : 'Excluded'}}</p>
            <p>Raw Data: {{exportForm.get('includeRawData')?.value ? 'Included' : 'Excluded'}}</p>
            <p *ngIf="exportForm.get('password')?.value">Password Protected: Yes</p>
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            [disabled]="!exportForm.valid"
            class="export-btn">
            Export Report
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .export-options-container {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      max-width: 600px;
      margin: 0 auto;
    }
    h3 {
      margin: 0 0 20px 0;
      color: #2D3748;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      color: #4A5568;
      font-weight: 500;
    }
    select, input[type="password"] {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #E2E8F0;
      border-radius: 4px;
      background-color: white;
      color: #2D3748;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
    }
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      cursor: pointer;
    }
    .checkbox-group input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    .preview-info {
      margin: 20px 0;
      padding: 15px;
      background-color: #F7FAFC;
      border-radius: 4px;
    }
    .preview-info h4 {
      margin: 0 0 10px 0;
      color: #2D3748;
    }
    .preview-details {
      display: grid;
      gap: 8px;
    }
    .preview-details p {
      margin: 0;
      color: #4A5568;
      font-size: 0.9em;
    }
    .form-actions {
      margin-top: 20px;
    }
    .export-btn {
      width: 100%;
      padding: 10px 20px;
      background-color: #4299E1;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    .export-btn:disabled {
      background-color: #A0AEC0;
      cursor: not-allowed;
    }
    .export-btn:hover:not(:disabled) {
      background-color: #3182CE;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class ExportOptionsComponent {
  @Output() exportOptions = new EventEmitter<ExportOptions>();

  exportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.exportForm = this.fb.group({
      format: ['pdf', Validators.required],
      compressionLevel: ['none', Validators.required],
      includeCharts: [true],
      includeRawData: [false],
      password: ['']
    });
  }

  onSubmit(): void {
    if (this.exportForm.valid) {
      const options: ExportOptions = {
        format: this.exportForm.get('format')?.value,
        compressionLevel: this.exportForm.get('compressionLevel')?.value,
        includeCharts: this.exportForm.get('includeCharts')?.value,
        includeRawData: this.exportForm.get('includeRawData')?.value
      };

      if (this.exportForm.get('password')?.value) {
        options.password = this.exportForm.get('password')?.value;
      }

      this.exportOptions.emit(options);
    }
  }
} 