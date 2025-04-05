import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports-nav',
  template: `
    <div class="reports-nav">
      <div class="nav-header">
        <h2>Reports</h2>
      </div>
      <nav class="nav-links">
        <a 
          [routerLink]="['/reports/generator']" 
          routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: true}">
          <i class="fas fa-file-alt"></i>
          Generate Report
        </a>
        <a 
          [routerLink]="['/reports/templates']" 
          routerLinkActive="active">
          <i class="fas fa-copy"></i>
          Templates
        </a>
        <a 
          [routerLink]="['/reports/history']" 
          routerLinkActive="active">
          <i class="fas fa-history"></i>
          History
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .reports-nav {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      margin-bottom: 20px;
      overflow: hidden;
    }
    .nav-header {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }
    .nav-header h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #2D3748;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
    }
    .nav-links a {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #4A5568;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    .nav-links a:hover {
      background-color: #F7FAFC;
    }
    .nav-links a.active {
      background-color: #EBF8FF;
      color: #2B6CB0;
      font-weight: 500;
    }
    .nav-links i {
      margin-right: 10px;
      width: 16px;
      text-align: center;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class ReportsNavComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we're on the root reports path and redirect to generator if needed
    if (this.router.url === '/reports') {
      this.router.navigate(['/reports/generator']);
    }
  }
} 