import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GraphComponent } from './graph.component';
import { SystemGraphComponent } from './components/system-graph/system-graph.component';
import { RelationshipGraphComponent } from './components/relationship-graph/relationship-graph.component';
import { GraphFiltersComponent } from './components/graph-filters/graph-filters.component';
import { GraphControlsComponent } from './components/graph-controls/graph-controls.component';

const routes: Routes = [
  {
    path: '',
    component: GraphComponent,
    children: [
      { path: '', redirectTo: 'system', pathMatch: 'full' },
      { path: 'system', component: SystemGraphComponent },
      { path: 'relationships', component: RelationshipGraphComponent }
    ]
  }
];

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
   
  ]
})
export class GraphModule { } 