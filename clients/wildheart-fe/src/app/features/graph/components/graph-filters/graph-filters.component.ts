import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-graph-filters',
  template: `
    <div class="filters-container">
      <div class="filters-header">
        <h3>Filters</h3>
        <button class="btn-reset" (click)="resetFilters()">Reset</button>
      </div>
      
      <div class="filters-section">
        <h4>Entity Types</h4>
        <div class="filter-options">
          <div class="filter-option" *ngFor="let type of entityTypes">
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                [checked]="isEntityTypeSelected(type.value)"
                (change)="toggleEntityType(type.value)"
              >
              <span class="checkmark"></span>
              {{ type.label }}
            </label>
          </div>
        </div>
      </div>
      
      <div class="filters-section">
        <h4>Status</h4>
        <div class="filter-options">
          <div class="filter-option" *ngFor="let status of statusOptions">
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                [checked]="isStatusSelected(status.value)"
                (change)="toggleStatus(status.value)"
              >
              <span class="checkmark"></span>
              {{ status.label }}
            </label>
          </div>
        </div>
      </div>
      
      <div class="filters-section">
        <h4>Relationship Types</h4>
        <div class="filter-options">
          <div class="filter-option" *ngFor="let type of relationshipTypes">
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                [checked]="isRelationshipTypeSelected(type.value)"
                (change)="toggleRelationshipType(type.value)"
              >
              <span class="checkmark"></span>
              {{ type.label }}
            </label>
          </div>
        </div>
      </div>
      
      <div class="filters-section">
        <h4>Search</h4>
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search entities..." 
            [(ngModel)]="searchTerm"
            (input)="onSearchChange()"
            class="search-input"
          >
        </div>
      </div>
      
      <div class="filters-actions">
        <button class="btn-apply" (click)="applyFilters()">Apply Filters</button>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .filters-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .filters-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .btn-reset {
      background: none;
      border: none;
      color: #5A67D8;
      cursor: pointer;
      font-size: 14px;
      padding: 0;
    }
    .filters-section {
      margin-bottom: 20px;
    }
    .filters-section h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      font-weight: 600;
      color: #4A5568;
    }
    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .filter-option {
      display: flex;
      align-items: center;
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
    .search-container {
      margin-top: 5px;
    }
    .search-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 4px;
      font-size: 14px;
    }
    .search-input:focus {
      outline: none;
      border-color: #5A67D8;
    }
    .filters-actions {
      margin-top: auto;
      padding-top: 20px;
    }
    .btn-apply {
      width: 100%;
      padding: 10px;
      background-color: #5A67D8;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-apply:hover {
      background-color: #4C51BF;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class GraphFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<any>();
  
  entityTypes: FilterOption[] = [
    { id: 'system', label: 'Systems', value: 'system' },
    { id: 'team', label: 'Teams', value: 'team' },
    { id: 'project', label: 'Projects', value: 'project' },
    { id: 'user', label: 'Users', value: 'user' }
  ];
  
  statusOptions: FilterOption[] = [
    { id: 'active', label: 'Active', value: 'active' },
    { id: 'inactive', label: 'Inactive', value: 'inactive' },
    { id: 'maintenance', label: 'Maintenance', value: 'maintenance' },
    { id: 'deprecated', label: 'Deprecated', value: 'deprecated' }
  ];
  
  relationshipTypes: FilterOption[] = [
    { id: 'depends', label: 'Depends on', value: 'depends' },
    { id: 'maintains', label: 'Maintains', value: 'maintains' },
    { id: 'uses', label: 'Uses', value: 'uses' },
    { id: 'managed', label: 'Managed by', value: 'managed' },
    { id: 'member', label: 'Member of', value: 'member' },
    { id: 'works', label: 'Works on', value: 'works' }
  ];
  
  selectedEntityTypes: string[] = [];
  selectedStatuses: string[] = [];
  selectedRelationshipTypes: string[] = [];
  searchTerm: string = '';
  
  constructor() {}
  
  ngOnInit(): void {
    // Initialize with all filters selected
    this.selectedEntityTypes = this.entityTypes.map(type => type.value);
    this.selectedStatuses = this.statusOptions.map(status => status.value);
    this.selectedRelationshipTypes = this.relationshipTypes.map(type => type.value);
  }
  
  isEntityTypeSelected(value: string): boolean {
    return this.selectedEntityTypes.includes(value);
  }
  
  toggleEntityType(value: string): void {
    const index = this.selectedEntityTypes.indexOf(value);
    if (index === -1) {
      this.selectedEntityTypes.push(value);
    } else {
      this.selectedEntityTypes.splice(index, 1);
    }
  }
  
  isStatusSelected(value: string): boolean {
    return this.selectedStatuses.includes(value);
  }
  
  toggleStatus(value: string): void {
    const index = this.selectedStatuses.indexOf(value);
    if (index === -1) {
      this.selectedStatuses.push(value);
    } else {
      this.selectedStatuses.splice(index, 1);
    }
  }
  
  isRelationshipTypeSelected(value: string): boolean {
    return this.selectedRelationshipTypes.includes(value);
  }
  
  toggleRelationshipType(value: string): void {
    const index = this.selectedRelationshipTypes.indexOf(value);
    if (index === -1) {
      this.selectedRelationshipTypes.push(value);
    } else {
      this.selectedRelationshipTypes.splice(index, 1);
    }
  }
  
  onSearchChange(): void {
    // In a real application, this might debounce the search
    this.applyFilters();
  }
  
  resetFilters(): void {
    this.selectedEntityTypes = this.entityTypes.map(type => type.value);
    this.selectedStatuses = this.statusOptions.map(status => status.value);
    this.selectedRelationshipTypes = this.relationshipTypes.map(type => type.value);
    this.searchTerm = '';
    this.applyFilters();
  }
  
  applyFilters(): void {
    const filters = {
      entityTypes: this.selectedEntityTypes,
      statuses: this.selectedStatuses,
      relationshipTypes: this.selectedRelationshipTypes,
      searchTerm: this.searchTerm
    };
    
    this.filtersChange.emit(filters);
  }
} 