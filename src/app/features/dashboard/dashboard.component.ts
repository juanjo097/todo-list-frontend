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
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject } from 'rxjs';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';

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
  userId: string = '';

  /* since the checkbox can duplicate calls to the api
    that's why I decided to add a debounceTime to prevent
    lot of https request
  */
  private taskCompletionSubject = new Subject<Task>();
  private taskCompletionSubscription = this.taskCompletionSubject
    .pipe(debounceTime(650))
    .subscribe(({ id, ...data }) => {
      if (id)
        this.tasksService.updateTasks(id, data).subscribe({
          next: () => {
            this.loadTasks();
            this.showSnackBar('Task status updated.');
          },
          error: (error) => console.error('Error completing task:', error),
        });
    });

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private dialogRef: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId() || '';
    if (this.userId) {
      this.loadTasks();
    }
  }

  loadTasks() {
    if (!this.userId) return;
    this.tasksService.getUserTasks(this.userId).subscribe({
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
    const dialogRef = this.dialogRef.open(TasksModalComponent, {
      width: '400px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          const { id } = task;
          if (id)
            this.tasksService.updateTasks(id, result).subscribe({
              next: () => {
                this.showSnackBar('Task updated successfully.');
                this.loadTasks();
              },
              error: (error) => {
                console.error(error);
                this.showSnackBar('Error in update task.');
              },
            });
        } else {
          const body = { userId: this.userId, ...result };
          this.tasksService.createTasks(body).subscribe({
            next: () => {
              this.showSnackBar('Task added successfully.');
              this.loadTasks();
            },
            error: (error) => {
              console.error(error);
              this.showSnackBar('Error in create task.');
            },
          });
        }
      }
    });
  }

  onDeleteTask(task: Task) {
    const confirmDelete = this.dialogRef.open(DeleteTaskModalComponent, {
      width: '350px',
    });

    confirmDelete.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        if (task.id)
          this.tasksService.deleteTask(task.id).subscribe({
            next: () => {
              this.showSnackBar('Task deleted successfully.');
              this.loadTasks();
            },
            error: (error) => {
              console.error(error);
              this.showSnackBar('Error in delete task.');
            },
          });
      }
    });
  }

  onTaskCompleted(task: Task) {
    const { createdAt, ...newTask } = task;
    this.taskCompletionSubject.next(newTask);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.taskCompletionSubscription.unsubscribe();
  }
}
