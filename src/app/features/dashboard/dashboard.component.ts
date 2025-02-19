import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { FilterComponent } from '../filter/filter.component';
import { TaskListComponent } from '../tasks-list/tasks-list.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { Task } from '../../shared/models/tasks';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FilterComponent,
    TaskListComponent,
    PaginatorComponent,
    MaterialModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  tasks = [
    { title: 'Aprender Angular', description: 'Revisar componentes y servicios', completed: true },
    { title: 'Hacer pruebas', description: 'Implementar unit tests', completed: false },
    { title: 'Mejorar UI', description: 'Ajustar diseño en Material', completed: false },
    { title: 'Optimizar código', description: 'Refactorizar componentes', completed: false },
    { title: 'Aprender RxJS', description: 'Estudiar observables', completed: false },
    { title: 'Configurar Backend', description: 'Conectar con Flask', completed: false },
  ];

  filteredTasks = [...this.tasks];
  paginatedTasks: Task[] = [];
  pageSize = 3;
  pageIndex = 0;

  ngOnInit() {
    this.updatePaginatedTasks();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.taskListComponent.updateTasks(this.paginatedTasks);
    });
  }

  applyFilter(filterText: string) {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(filterText.toLowerCase())
    );
    this.pageIndex = 0;
    this.updatePaginatedTasks();
  }

  onPageChange(event: any) {
    console.log('Evento de paginación recibido:', event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedTasks();
  }

  /**
   * Updates the paginated tasks based on the current page index and page size.
   * It slices the filtered tasks array to get the tasks for the current page
   * and assigns them to the `paginatedTasks` array. Then, it logs the paginated tasks
   * to the console and updates the task list component if it exists.
   *
   * @remarks
   * This method assumes that `pageIndex`, `pageSize`, `filteredTasks`, and `taskListComponent`
   * are defined and properly initialized in the component.
   */
  updatePaginatedTasks() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = [...this.filteredTasks.slice(startIndex, endIndex)];
    console.log('Tareas paginadas al inicio:', this.paginatedTasks);

    if (this.taskListComponent) {
      this.taskListComponent.updateTasks(this.paginatedTasks);
    }
  }

  onEditTask(task: Task) {
    console.log('Editar tarea:', task);
  }

  onDeleteTask(task: Task) {
    console.log('Eliminar tarea:', task);
    this.tasks = this.tasks.filter(t => t !== task);
    this.updatePaginatedTasks();
  }

  onTaskCompleted(task: Task) {
    console.log(`Tarea: ${task.title} ahora está ${task.completed ? 'completada' : 'pendiente'}`);
    console.log('Completar Tarea:', task);

  }

}
