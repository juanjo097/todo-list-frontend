import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { FilterComponent } from '../filter/filter.component';
import { TaskListComponent } from '../tasks-list/tasks-list.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MaterialModule } from '../../shared/modules/material.module';

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
    { title: 'Aprender Angular', description: 'Revisar componentes y servicios' },
    { title: 'Hacer pruebas', description: 'Implementar unit tests' },
    { title: 'Mejorar UI', description: 'Ajustar diseño en Material' },
    { title: 'Optimizar código', description: 'Refactorizar componentes' },
    { title: 'Aprender RxJS', description: 'Estudiar observables' },
    { title: 'Configurar Backend', description: 'Conectar con Flask' },
  ];

  filteredTasks = [...this.tasks];
  paginatedTasks: { title: string; description: string }[] = [];
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

  updatePaginatedTasks() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = [...this.filteredTasks.slice(startIndex, endIndex)];
    console.log('Tareas paginadas al inicio:', this.paginatedTasks);

    // Forzar actualización en TaskListComponent
    if (this.taskListComponent) {
      this.taskListComponent.updateTasks(this.paginatedTasks);
    }
  }


}
