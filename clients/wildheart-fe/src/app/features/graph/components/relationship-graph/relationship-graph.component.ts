import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  description: string;
  strength: 'Weak' | 'Medium' | 'Strong';
}

interface Entity {
  id: string;
  name: string;
  type: 'System' | 'Team' | 'Project' | 'User';
  description: string;
}

interface GraphNode {
  id: string;
  label: string;
  group: string;
  title: string;
}

interface GraphEdge {
  from: string;
  to: string;
  arrows: string;
  label: string;
  dashes: boolean;
}

@Component({
  selector: 'app-relationship-graph',
  template: `
    <div class="relationship-graph-container">
      <div class="graph-header">
        <h2>Relationship Graph</h2>
        <div class="graph-legend">
          <div class="legend-item">
            <span class="legend-color system"></span>
            <span>System</span>
          </div>
          <div class="legend-item">
            <span class="legend-color team"></span>
            <span>Team</span>
          </div>
          <div class="legend-item">
            <span class="legend-color project"></span>
            <span>Project</span>
          </div>
          <div class="legend-item">
            <span class="legend-color user"></span>
            <span>User</span>
          </div>
        </div>
      </div>
      <div class="graph-content">
        <div class="graph-visualization">
          <!-- In a real application, this would use a graph visualization library like vis.js -->
          <div class="mock-graph">
            <div class="mock-node" *ngFor="let node of nodes" [ngClass]="node.group.toLowerCase()">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-type">{{ node.group }}</div>
            </div>
            <div class="mock-edge" *ngFor="let edge of edges">
              <div class="edge-line" [ngClass]="{'edge-dashed': edge.dashes}"></div>
              <div class="edge-label">{{ edge.label }}</div>
            </div>
          </div>
        </div>
        <div class="graph-details" *ngIf="selectedNode">
          <h3>Entity Details</h3>
          <div class="details-content">
            <div class="detail-item">
              <span class="detail-label">Name:</span>
              <span class="detail-value">{{ selectedNode.label }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Type:</span>
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
    .relationship-graph-container {
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
    .system {
      background-color: #3B82F6;
    }
    .team {
      background-color: #10B981;
    }
    .project {
      background-color: #F59E0B;
    }
    .user {
      background-color: #8B5CF6;
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
    .node-type {
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .system {
      background-color: rgba(59, 130, 246, 0.1);
      border: 1px solid #3B82F6;
    }
    .team {
      background-color: rgba(16, 185, 129, 0.1);
      border: 1px solid #10B981;
    }
    .project {
      background-color: rgba(245, 158, 11, 0.1);
      border: 1px solid #F59E0B;
    }
    .user {
      background-color: rgba(139, 92, 246, 0.1);
      border: 1px solid #8B5CF6;
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
    .edge-dashed {
      border-style: dashed;
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
  `],
  standalone: true,
  imports: [CommonModule]
})
export class RelationshipGraphComponent implements OnInit, OnChanges {
  @Input() entities: Entity[] = [];
  @Input() relationships: Relationship[] = [];
  @Input() filters: any = {};

  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];
  selectedNode: GraphNode | null = null;

  constructor() {}

  ngOnInit(): void {
    this.updateGraph();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entities'] || changes['relationships'] || changes['filters']) {
      this.updateGraph();
    }
  }

  updateGraph(): void {
    // In a real application, this would transform the entities and relationships
    // into a format suitable for a graph visualization library
    
    // For now, we'll create mock data
    this.nodes = [
      { id: '1', label: 'Frontend API', group: 'System', title: 'Main API for frontend services' },
      { id: '2', label: 'Auth Service', group: 'System', title: 'Authentication and authorization service' },
      { id: '3', label: 'Frontend Team', group: 'Team', title: 'Team responsible for frontend development' },
      { id: '4', label: 'Backend Team', group: 'Team', title: 'Team responsible for backend development' },
      { id: '5', label: 'Website Redesign', group: 'Project', title: 'Project to redesign the company website' },
      { id: '6', label: 'Mobile App', group: 'Project', title: 'Project to develop a mobile application' },
      { id: '7', label: 'John Doe', group: 'User', title: 'Frontend Developer' },
      { id: '8', label: 'Jane Smith', group: 'User', title: 'Backend Developer' }
    ];
    
    this.edges = [
      { from: '1', to: '2', arrows: 'to', label: 'Depends on', dashes: false },
      { from: '3', to: '1', arrows: 'to', label: 'Maintains', dashes: false },
      { from: '4', to: '2', arrows: 'to', label: 'Maintains', dashes: false },
      { from: '5', to: '1', arrows: 'to', label: 'Uses', dashes: false },
      { from: '5', to: '3', arrows: 'to', label: 'Managed by', dashes: false },
      { from: '6', to: '1', arrows: 'to', label: 'Uses', dashes: false },
      { from: '6', to: '3', arrows: 'to', label: 'Managed by', dashes: false },
      { from: '7', to: '3', arrows: 'to', label: 'Member of', dashes: false },
      { from: '7', to: '5', arrows: 'to', label: 'Works on', dashes: false },
      { from: '8', to: '4', arrows: 'to', label: 'Member of', dashes: false },
      { from: '8', to: '2', arrows: 'to', label: 'Works on', dashes: false }
    ];
  }

  selectNode(node: GraphNode): void {
    this.selectedNode = node;
  }
} 