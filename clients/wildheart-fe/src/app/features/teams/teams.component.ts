import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teams',
  template: `
    <div class="teams-container">
      <div class="teams-layout">
        <div class="teams-sidebar">
          <h2>Teams</h2>
          <nav class="teams-nav">
            <a routerLink="list" routerLinkActive="active">All Teams</a>
          </nav>
        </div>
        <div class="teams-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .teams-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .teams-layout {
      display: flex;
      gap: 20px;
    }
    .teams-sidebar {
      width: 250px;
      flex-shrink: 0;
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    .teams-content {
      flex-grow: 1;
      min-width: 0; /* Prevents flex item from overflowing */
    }
    .teams-nav {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }
    .teams-nav a {
      padding: 10px;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    .teams-nav a:hover {
      background-color: #e0e0e0;
    }
    .teams-nav a.active {
      background-color: #5A67D8;
      color: white;
    }
    
    /* Responsive layout */
    @media (max-width: 768px) {
      .teams-layout {
        flex-direction: column;
      }
      .teams-sidebar {
        width: 100%;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class TeamsComponent {} 