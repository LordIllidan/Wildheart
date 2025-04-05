import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  lastModified: Date;
  createdBy: string;
}

@Component({
  selector: 'app-report-templates',
  template: `
    <div class="templates-container">
      <div class="header">
        <h2>Report Templates</h2>
        <button class="create-btn" (click)="createNewTemplate()">
          Create New Template
        </button>
      </div>

      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Search templates..." 
          [(ngModel)]="searchQuery"
          (input)="filterTemplates()">
      </div>

      <div class="templates-grid">
        <div class="template-card" *ngFor="let template of filteredTemplates">
          <div class="template-header">
            <h3>{{template.name}}</h3>
            <div class="template-type">{{template.type}}</div>
          </div>
          <p class="description">{{template.description}}</p>
          <div class="template-footer">
            <div class="meta-info">
              <span>Created by: {{template.createdBy}}</span>
              <span>Last modified: {{template.lastModified | date:'mediumDate'}}</span>
            </div>
            <div class="actions">
              <button class="action-btn edit" (click)="editTemplate(template)">
                Edit
              </button>
              <button class="action-btn use" (click)="useTemplate(template)">
                Use
              </button>
              <button class="action-btn delete" (click)="deleteTemplate(template)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="filteredTemplates.length === 0">
        <p>No templates found. Create a new template to get started.</p>
      </div>
    </div>
  `,
  styles: [`
    .templates-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .create-btn {
      padding: 10px 20px;
      background-color: #5A67D8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .search-bar {
      margin-bottom: 20px;
    }
    .search-bar input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .template-card {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .template-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .template-header h3 {
      margin: 0;
      font-size: 1.1em;
    }
    .template-type {
      background-color: #EBF4FF;
      color: #4299E1;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.8em;
    }
    .description {
      color: #666;
      margin-bottom: 15px;
      font-size: 0.9em;
    }
    .template-footer {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .meta-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 0.8em;
      color: #666;
    }
    .actions {
      display: flex;
      gap: 5px;
    }
    .action-btn {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8em;
    }
    .action-btn.edit {
      background-color: #E2E8F0;
      color: #4A5568;
    }
    .action-btn.use {
      background-color: #C6F6D5;
      color: #2F855A;
    }
    .action-btn.delete {
      background-color: #FED7D7;
      color: #C53030;
    }
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ReportTemplatesComponent implements OnInit {
  templates: ReportTemplate[] = [];
  filteredTemplates: ReportTemplate[] = [];
  searchQuery = '';

  constructor() {
    // Initialize with sample data
    this.templates = [
      {
        id: '1',
        name: 'Monthly System Status',
        description: 'Comprehensive report of system performance and health metrics',
        type: 'System',
        lastModified: new Date('2023-04-15'),
        createdBy: 'Admin User'
      },
      {
        id: '2',
        name: 'Project Progress Summary',
        description: 'Overview of project milestones, tasks, and completion rates',
        type: 'Project',
        lastModified: new Date('2023-04-10'),
        createdBy: 'Project Manager'
      },
      {
        id: '3',
        name: 'User Activity Log',
        description: 'Detailed log of user actions and system access',
        type: 'Audit',
        lastModified: new Date('2023-04-05'),
        createdBy: 'Security Admin'
      },
      {
        id: '4',
        name: 'Error Analysis Report',
        description: 'Analysis of system errors and exceptions',
        type: 'System',
        lastModified: new Date('2023-04-01'),
        createdBy: 'DevOps Team'
      }
    ];
    this.filteredTemplates = [...this.templates];
  }

  ngOnInit(): void {
    // TODO: Load templates from service
  }

  filterTemplates(): void {
    if (!this.searchQuery.trim()) {
      this.filteredTemplates = [...this.templates];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredTemplates = this.templates.filter(template => 
      template.name.toLowerCase().includes(query) || 
      template.description.toLowerCase().includes(query) ||
      template.type.toLowerCase().includes(query)
    );
  }

  createNewTemplate(): void {
    // TODO: Implement template creation
    console.log('Create new template');
  }

  editTemplate(template: ReportTemplate): void {
    // TODO: Implement template editing
    console.log('Edit template:', template);
  }

  useTemplate(template: ReportTemplate): void {
    // TODO: Implement template usage
    console.log('Use template:', template);
  }

  deleteTemplate(template: ReportTemplate): void {
    // TODO: Implement template deletion
    console.log('Delete template:', template);
  }
} 