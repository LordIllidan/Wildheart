import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReportsNavComponent } from './components/reports-nav/reports-nav.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReportsNavComponent
  ],
  template: `
    <div class="reports-container">
      <div class="reports-layout">
        <div class="reports-sidebar">
          <app-reports-nav></app-reports-nav>
        </div>
        <div class="reports-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .reports-layout {
      display: flex;
      gap: 20px;
    }
    .reports-sidebar {
      width: 250px;
      flex-shrink: 0;
    }
    .reports-content {
      flex-grow: 1;
      min-width: 0; /* Prevents flex item from overflowing */
    }
    
    /* Responsive layout */
    @media (max-width: 768px) {
      .reports-layout {
        flex-direction: column;
      }
      .reports-sidebar {
        width: 100%;
      }
    }
  `]
})
export class ReportsComponent {} 