import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface System {
  id: string;
  name: string;
  namespace: string;
  ipAddress: string;
  isKubernetes: boolean;
  projectId: string;
  teamId: string;
  tag: string;
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Deprecated';
}

interface SystemNode {
  id: string;
  label: string;
  group: string;
  status: string;
  title: string;
}

interface SystemEdge {
  from: string;
  to: string;
  arrows: string;
  label: string;
}

@Component({
  selector: 'app-system-graph',
  template: `
    <div class="system-graph-container">
      <div class="graph-header">
        <h2>System Graph</h2>
        <div class="graph-legend">
          <div class="legend-item">
            <span class="legend-color status-active"></span>
            <span>Active</span>
          </div>
          <div class="legend-item">
            <span class="legend-color status-inactive"></span>
            <span>Inactive</span>
          </div>
          <div class="legend-item">
            <span class="legend-color status-maintenance"></span>
            <span>Maintenance</span>
          </div>
          <div class="legend-item">
            <span class="legend-color status-deprecated"></span>
            <span>Deprecated</span>
          </div>
        </div>
      </div>
      <div class="graph-content">
        <div class="graph-visualization">
          <!-- In a real application, this would use a graph visualization library like vis.js -->
          <div class="mock-graph">
            <div class="mock-node status-active" *ngFor="let node of nodes">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-status">{{ node.status }}</div>
            </div>
            <div class="mock-edge" *ngFor="let edge of edges">
              <div class="edge-line"></div>
              <div class="edge-label">{{ edge.label }}</div>
            </div>
          </div>
        </div>
        <div class="graph-details" *ngIf="selectedNode">
          <h3>System Details</h3>
          <div class="details-content">
            <div class="detail-item">
              <span class="detail-label">Name:</span>
              <span class="detail-value">{{ selectedNode.label }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value status-badge" [ngClass]="'status-' + selectedNode.status.toLowerCase()">
                {{ selectedNode.status }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Group:</span>
              <span class="detail-value">{{ selectedNode.group }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Description:</span>
              <span class="detail-value">{{ selectedNode.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .system-graph-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #f8f9fa;
      border-radius: 8px;
      overflow: hidden;
    }
    .graph-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background-color: white;
      border-bottom: 1px solid #e9ecef;
    }
    .graph-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .graph-legend {
      display: flex;
      gap: 15px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
    }
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .status-active {
      background-color: #10B981;
    }
    .status-inactive {
      background-color: #6B7280;
    }
    .status-maintenance {
      background-color: #F59E0B;
    }
    .status-deprecated {
      background-color: #EF4444;
    }
    .graph-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .graph-visualization {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .mock-graph {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
    .mock-node {
      width: 120px;
      height: 80px;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .mock-node:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .node-label {
      font-weight: 600;
      margin-bottom: 5px;
      text-align: center;
    }
    .node-status {
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .mock-edge {
      position: absolute;
      width: 100px;
      height: 2px;
      background-color: #CBD5E0;
      transform-origin: left center;
    }
    .edge-line {
      width: 100%;
      height: 100%;
      background-color: #CBD5E0;
    }
    .edge-label {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      padding: 0 5px;
      font-size: 10px;
      color: #718096;
    }
    .graph-details {
      width: 300px;
      background-color: white;
      border-left: 1px solid #e9ecef;
      padding: 20px;
      overflow-y: auto;
    }
    .graph-details h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 600;
    }
    .details-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .detail-label {
      font-size: 12px;
      color: #718096;
    }
    .detail-value {
      font-size: 14px;
    }
    .status-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class SystemGraphComponent implements OnInit, OnChanges {
  @Input() systems: System[] = [];
  @Input() relationships: any[] = [];
  @Input() filters: any = {};

  nodes: SystemNode[] = [];
  edges: SystemEdge[] = [];
  selectedNode: SystemNode | null = null;

  constructor() {}

  ngOnInit(): void {
    this.updateGraph();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['systems'] || changes['relationships'] || changes['filters']) {
      this.updateGraph();
    }
  }

  updateGraph(): void {
    // In a real application, this would transform the systems and relationships
    // into a format suitable for a graph visualization library
    
    // For now, we'll create mock data
    this.nodes = [
      { id: '1', label: 'Frontend API', group: 'Frontend', status: 'Active', title: 'Main API for frontend services' },
      { id: '2', label: 'Auth Service', group: 'Auth', status: 'Active', title: 'Authentication and authorization service' },
      { id: '3', label: 'Database', group: 'Data', status: 'Active', title: 'Main database service' },
      { id: '4', label: 'Cache Service', group: 'Data', status: 'Maintenance', title: 'Caching service for performance optimization' },
      { id: '5', label: 'Legacy API', group: 'Legacy', status: 'Deprecated', title: 'Legacy API being phased out' },
      { id: '6', label: 'Monitoring', group: 'Infrastructure', status: 'Active', title: 'System monitoring service' },
      { id: '7', label: 'Logging', group: 'Infrastructure', status: 'Inactive', title: 'Centralized logging service' }
    ];
    
    this.edges = [
      { from: '1', to: '2', arrows: 'to', label: 'Auth' },
      { from: '1', to: '3', arrows: 'to', label: 'Data' },
      { from: '1', to: '4', arrows: 'to', label: 'Cache' },
      { from: '2', to: '3', arrows: 'to', label: 'Data' },
      { from: '4', to: '3', arrows: 'to', label: 'Data' },
      { from: '5', to: '3', arrows: 'to', label: 'Data' },
      { from: '6', to: '1', arrows: 'to', label: 'Monitor' },
      { from: '6', to: '2', arrows: 'to', label: 'Monitor' },
      { from: '6', to: '3', arrows: 'to', label: 'Monitor' },
      { from: '7', to: '1', arrows: 'to', label: 'Log' },
      { from: '7', to: '2', arrows: 'to', label: 'Log' },
      { from: '7', to: '3', arrows: 'to', label: 'Log' }
    ];
  }

  selectNode(node: SystemNode): void {
    this.selectedNode = node;
  }
} 