import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LayoutOption {
  id: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-graph-controls',
  template: `
    <div class="controls-container">
      <div class="controls-header">
        <h3>Graph Controls</h3>
      </div>
      
      <div class="controls-section">
        <h4>Layout</h4>
        <div class="layout-options">
          <div class="layout-option" *ngFor="let layout of layoutOptions">
            <label class="radio-container">
              <input 
                type="radio" 
                name="layout" 
                [value]="layout.value"
                [checked]="selectedLayout === layout.value"
                (change)="changeLayout(layout.value)"
              >
              <span class="radio-mark"></span>
              {{ layout.label }}
            </label>
          </div>
        </div>
      </div>
      
      <div class="controls-section">
        <h4>Zoom</h4>
        <div class="zoom-controls">
          <button class="btn-zoom" (click)="zoomIn()">
            <i class="fas fa-search-plus"></i>
          </button>
          <div class="zoom-level">{{ zoomLevel }}%</div>
          <button class="btn-zoom" (click)="zoomOut()">
            <i class="fas fa-search-minus"></i>
          </button>
        </div>
        <div class="zoom-slider">
          <input 
            type="range" 
            min="50" 
            max="200" 
            step="10" 
            [(ngModel)]="zoomLevel" 
            (input)="onZoomChange()"
            class="slider"
          >
        </div>
      </div>
      
      <div class="controls-section">
        <h4>Display Options</h4>
        <div class="display-options">
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              [(ngModel)]="showLabels"
              (change)="onDisplayOptionChange()"
            >
            <span class="checkmark"></span>
            Show Labels
          </label>
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              [(ngModel)]="showArrows"
              (change)="onDisplayOptionChange()"
            >
            <span class="checkmark"></span>
            Show Arrows
          </label>
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              [(ngModel)]="showDetails"
              (change)="onDisplayOptionChange()"
            >
            <span class="checkmark"></span>
            Show Details Panel
          </label>
        </div>
      </div>
      
      <div class="controls-section">
        <h4>Actions</h4>
        <div class="action-buttons">
          <button class="btn-action" (click)="centerGraph()">
            <i class="fas fa-crosshairs"></i>
            Center Graph
          </button>
          <button class="btn-action" (click)="exportGraph()">
            <i class="fas fa-file-export"></i>
            Export
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .controls-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    .controls-header {
      margin-bottom: 20px;
    }
    .controls-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .controls-section {
      margin-bottom: 20px;
    }
    .controls-section h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      font-weight: 600;
      color: #4A5568;
    }
    .layout-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .layout-option {
      display: flex;
      align-items: center;
    }
    .radio-container {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 28px;
      cursor: pointer;
      font-size: 14px;
      user-select: none;
    }
    .radio-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .radio-mark {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      background-color: #fff;
      border: 1px solid #CBD5E0;
      border-radius: 50%;
    }
    .radio-container:hover input ~ .radio-mark {
      border-color: #5A67D8;
    }
    .radio-container input:checked ~ .radio-mark {
      border-color: #5A67D8;
    }
    .radio-mark:after {
      content: "";
      position: absolute;
      display: none;
    }
    .radio-container input:checked ~ .radio-mark:after {
      display: block;
    }
    .radio-container .radio-mark:after {
      top: 4px;
      left: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #5A67D8;
    }
    .zoom-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .btn-zoom {
      background-color: #EDF2F7;
      border: none;
      border-radius: 4px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #4A5568;
      transition: background-color 0.2s;
    }
    .btn-zoom:hover {
      background-color: #E2E8F0;
    }
    .zoom-level {
      font-size: 14px;
      font-weight: 500;
    }
    .zoom-slider {
      width: 100%;
    }
    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: #CBD5E0;
      outline: none;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #5A67D8;
      cursor: pointer;
    }
    .slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #5A67D8;
      cursor: pointer;
    }
    .display-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 28px;
      cursor: pointer;
      font-size: 14px;
      user-select: none;
    }
    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      background-color: #fff;
      border: 1px solid #CBD5E0;
      border-radius: 3px;
    }
    .checkbox-container:hover input ~ .checkmark {
      border-color: #5A67D8;
    }
    .checkbox-container input:checked ~ .checkmark {
      background-color: #5A67D8;
      border-color: #5A67D8;
    }
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
    }
    .checkbox-container .checkmark:after {
      left: 6px;
      top: 2px;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .btn-action {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background-color: #EDF2F7;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      color: #4A5568;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-action:hover {
      background-color: #E2E8F0;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GraphControlsComponent implements OnInit {
  @Output() layoutChange = new EventEmitter<string>();
  @Output() zoomChange = new EventEmitter<number>();
  @Output() displayOptionsChange = new EventEmitter<any>();
  @Output() centerGraphEvent = new EventEmitter<void>();
  @Output() exportGraphEvent = new EventEmitter<void>();
  
  layoutOptions: LayoutOption[] = [
    { id: 'force', label: 'Force-Directed', value: 'force' },
    { id: 'hierarchical', label: 'Hierarchical', value: 'hierarchical' },
    { id: 'circular', label: 'Circular', value: 'circular' },
    { id: 'grid', label: 'Grid', value: 'grid' }
  ];
  
  selectedLayout: string = 'force';
  zoomLevel: number = 100;
  showLabels: boolean = true;
  showArrows: boolean = true;
  showDetails: boolean = true;
  
  constructor() {}
  
  ngOnInit(): void {}
  
  changeLayout(layout: string): void {
    this.selectedLayout = layout;
    this.layoutChange.emit(layout);
  }
  
  zoomIn(): void {
    if (this.zoomLevel < 200) {
      this.zoomLevel += 10;
      this.onZoomChange();
    }
  }
  
  zoomOut(): void {
    if (this.zoomLevel > 50) {
      this.zoomLevel -= 10;
      this.onZoomChange();
    }
  }
  
  onZoomChange(): void {
    this.zoomChange.emit(this.zoomLevel);
  }
  
  onDisplayOptionChange(): void {
    const options = {
      showLabels: this.showLabels,
      showArrows: this.showArrows,
      showDetails: this.showDetails
    };
    
    this.displayOptionsChange.emit(options);
  }
  
  centerGraph(): void {
    this.centerGraphEvent.emit();
  }
  
  exportGraph(): void {
    this.exportGraphEvent.emit();
  }
} 