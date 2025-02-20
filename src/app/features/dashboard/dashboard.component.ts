import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { FilterComponent } from '../filter/filter.component';
import { TaskListComponent } from '../tasks-list/tasks-list.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { Task } from '../../shared/models/tasks';
import { AuthService } from '../../core/services/auth.service';
import { TasksService } from '../../core/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { TasksModalComponent } from '../tasks-modal/tasks-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FilterComponent,
    TaskListComponent,
    PaginatorComponent,
    MaterialModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  paginatedTasks: Task[] = [];
  pageSize = 3;
  pageIndex = 0;

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private dialogRef : MatDialog
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.loadTasks(userId);
    }
  }

  loadTasks(userId: string) {
    this.tasksService.getUserTasks(userId).subscribe({
      next: ({ data, message }) => {
        if (data && message === 'success') {
          this.setTasks(data);
        }
      },
      error: (error) => console.error(error),
    });
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.filteredTasks = [...tasks];
    this.updatePaginatedTasks();
  }

  updatePaginatedTasks() {
    const start = this.pageIndex * this.pageSize;
    this.paginatedTasks = this.filteredTasks.slice(
      start,
      start + this.pageSize
    );
    this.taskListComponent?.updateTasks(this.paginatedTasks);
  }

  applyFilter(filterText: string) {
    this.filteredTasks = this.tasks.filter((task) =>
      task.title.toLowerCase().includes(filterText.toLowerCase())
    );
    this.pageIndex = 0;
    this.updatePaginatedTasks();
  }

  onPageChange({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.updatePaginatedTasks();
  }

  handleTaskChange(updatedTasks: Task[]) {
    this.setTasks(updatedTasks);
  }

  onAddEditTask(task?: Task) {
    console.log('Editar tarea:', task);
    const dialogRef = this.dialogRef.open(TasksModalComponent, {
      width: '400px',
      data : { task }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          Object.assign(task, result);
        } else {
          this.tasks.push({ id: Date.now(), ...result });
          this.setTasks(this.tasks);
        }
      }
    });
  }

  onDeleteTask(task: Task) {
    console.log('Eliminar tarea:', task);
    this.handleTaskChange(this.tasks.filter((t) => t !== task));
  }

  onTaskCompleted(task: Task) {
    console.log(
      `Tarea: ${task.title} ahora está ${
        task.completed ? 'completada' : 'pendiente'
      }`
    );
  }
}
