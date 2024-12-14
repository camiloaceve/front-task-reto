import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', loadComponent: () => import('./views/task-list/task-list.component').then(m => m.TaskListComponent) },
  { path: 'tasks/new', loadComponent: () => import('./views/task-form/task-form.component').then(m => m.TaskFormComponent) },
  { path: 'tasks/:id', loadComponent: () => import('./views/task-details/task-details.component').then(m => m.TaskDetailsComponent) },
];
