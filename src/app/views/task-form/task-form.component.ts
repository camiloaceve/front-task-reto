import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <-- Agregar FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [RouterModule, BrowserModule, FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  task = { description: '', status: 'pendiente' };
  isEditMode = false;
  taskId: string | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string): void {
    this.taskService.getTaskById(id).subscribe((data: any) => {
      this.task = data;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.taskService.updateTask(this.taskId!, this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
