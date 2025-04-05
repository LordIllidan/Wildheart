import { Component } from '@angular/core';
import { GraphFiltersComponent } from './components/graph-filters/graph-filters.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphControlsComponent } from './components/graph-controls/graph-controls.component';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    GraphFiltersComponent,  
    GraphControlsComponent
  ],
  selector: 'app-graph',
  template: `
    <div class="graph-container">
      <div class="graph-layout">
        <div class="graph-sidebar">
          <app-graph-filters></app-graph-filters>
        </div>
        <div class="graph-content">
          <app-graph-controls></app-graph-controls>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .graph-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .graph-layout {
      display: flex;
      gap: 20px;
    }
    .graph-sidebar {
      width: 250px;
      flex-shrink: 0;
    }
    .graph-content {
      flex-grow: 1;
      min-width: 0; /* Prevents flex item from overflowing */
    }
    
    /* Responsive layout */
    @media (max-width: 768px) {
      .graph-layout {
        flex-direction: column;
      }
      .graph-sidebar {
        width: 100%;
      }
    }
  `]
})
export class GraphComponent {} 