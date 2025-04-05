import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  ReportTemplate, 
  ReportHistory, 
  ReportGenerationOptions, 
  ExportOptions,
  ReportType,
  ReportFilterOptions
} from '../models/report.models';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = '/api/reports';

  constructor(private http: HttpClient) {}

  // Report Templates
  getTemplates(): Observable<ReportTemplate[]> {
    // TODO: Replace with actual API call
    return of([
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
    ]).pipe(delay(500)); // Simulate network delay
  }

  createTemplate(template: Omit<ReportTemplate, 'id' | 'lastModified' | 'createdBy'>): Observable<ReportTemplate> {
    // TODO: Replace with actual API call
    const newTemplate: ReportTemplate = {
      ...template,
      id: Math.random().toString(36).substring(2, 9),
      lastModified: new Date(),
      createdBy: 'Current User' // This would come from auth service
    };
    return of(newTemplate).pipe(delay(800));
  }

  updateTemplate(template: ReportTemplate): Observable<ReportTemplate> {
    // TODO: Replace with actual API call
    const updatedTemplate = {
      ...template,
      lastModified: new Date()
    };
    return of(updatedTemplate).pipe(delay(800));
  }

  deleteTemplate(id: string): Observable<boolean> {
    // TODO: Replace with actual API call
    return of(true).pipe(delay(500));
  }

  // Report History
  getReportHistory(filters?: ReportFilterOptions): Observable<ReportHistory[]> {
    // TODO: Replace with actual API call
    return of([
      {
        id: '1',
        name: 'Monthly System Status',
        type: 'System',
        generatedBy: 'Admin User',
        generatedAt: new Date('2023-04-15'),
        status: 'completed' as const,
        fileSize: '2.5 MB',
        downloadUrl: '/reports/1'
      },
      {
        id: '2',
        name: 'Project Progress Summary',
        type: 'Project',
        generatedBy: 'Project Manager',
        generatedAt: new Date('2023-04-10'),
        status: 'completed' as const,
        fileSize: '1.8 MB',
        downloadUrl: '/reports/2'
      },
      {
        id: '3',
        name: 'User Activity Log',
        type: 'Audit',
        generatedBy: 'Security Admin',
        generatedAt: new Date('2023-04-05'),
        status: 'failed' as const
      },
      {
        id: '4',
        name: 'Performance Metrics',
        type: 'Performance',
        generatedBy: 'DevOps Team',
        generatedAt: new Date('2023-04-01'),
        status: 'in_progress' as const
      }
    ]).pipe(delay(500));
  }

  deleteReport(id: string): Observable<boolean> {
    // TODO: Replace with actual API call
    return of(true).pipe(delay(500));
  }

  // Report Generation
  generateReport(options: ReportGenerationOptions): Observable<ReportHistory> {
    // TODO: Replace with actual API call
    const newReport: ReportHistory = {
      id: Math.random().toString(36).substring(2, 9),
      name: `${options.reportType} Report`,
      type: options.reportType,
      generatedBy: 'Current User', // This would come from auth service
      generatedAt: new Date(),
      status: 'in_progress' as const
    };
    return of(newReport).pipe(delay(1500));
  }

  // Export Options
  exportReport(reportId: string, options: ExportOptions): Observable<{ downloadUrl: string }> {
    // TODO: Replace with actual API call
    return of({
      downloadUrl: `/reports/export/${reportId}?format=${options.format}`
    }).pipe(delay(1000));
  }

  // Report Types
  getReportTypes(): Observable<ReportType[]> {
    // TODO: Replace with actual API call
    return of([
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
    ]).pipe(delay(300));
  }
} 