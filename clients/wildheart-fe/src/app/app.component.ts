import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <main>
      <h1>Welcome to Wildheart</h1>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    
    :host {
      display: block;
      padding: 1rem;
    }
    main {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #5A67D8;
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'wildheart-fe';
} 