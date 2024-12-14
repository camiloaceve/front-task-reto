import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  task: any = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.loadTask(taskId);
    }
  }

  loadTask(id: string): void {
    this.taskService.getTaskById(id).subscribe((data: any) => {
      this.task = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
