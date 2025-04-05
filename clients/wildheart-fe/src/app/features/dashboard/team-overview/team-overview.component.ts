import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  role: string;
}

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    RouterModule,
    MatMenuModule,
    MatChipListbox
  ]
})
export class TeamOverviewComponent implements OnInit {
  teams: Team[] = [
    {
      id: '1',
      name: 'Development Team',
      memberCount: 8,
      role: 'Engineering'
    },
    {
      id: '2',
      name: 'Design Team',
      memberCount: 4,
      role: 'Design'
    },
    {
      id: '3',
      name: 'Product Team',
      memberCount: 3,
      role: 'Product'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'engineering':
        return 'primary';
      case 'design':
        return 'accent';
      case 'product':
        return 'warn';
      default:
        return 'primary';
    }
  }
} 