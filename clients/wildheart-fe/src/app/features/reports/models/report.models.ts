/**
 * Report Types
 */
export interface ReportType {
  id: string;
  name: string;
  description: string;
}

/**
 * Report Template
 */
export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  lastModified: Date;
  createdBy: string;
}

/**
 * Report History
 */
export interface ReportHistory {
  id: string;
  name: string;
  type: string;
  generatedBy: string;
  generatedAt: Date;
  status: 'completed' | 'failed' | 'in_progress';
  fileSize?: string;
  downloadUrl?: string;
}

/**
 * Report Generation Options
 */
export interface ReportGenerationOptions {
  reportType: string;
  startDate: Date;
  endDate: Date;
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeRawData: boolean;
}

/**
 * Export Options
 */
export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeRawData: boolean;
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  password?: string;
}

/**
 * Report Preview Data
 */
export interface ReportPreview {
  title: string;
  description: string;
  sections: ReportSection[];
  generatedAt: Date;
}

/**
 * Report Section
 */
export interface ReportSection {
  title: string;
  content: string;
  type: 'text' | 'table' | 'chart';
  data?: any;
}

/**
 * Report Filter Options
 */
export interface ReportFilterOptions {
  type?: string;
  status?: 'completed' | 'failed' | 'in_progress';
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
} 