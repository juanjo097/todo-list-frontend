import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../shared/models/tasks';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ MaterialModule, CommonModule, FormsModule ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() taskCompleted = new EventEmitter<Task>();

  ngOnChanges() {
    console.log('Tareas actualizadas en TaskListComponent:', this.tasks);
  }

  toggleComplete(task: Task, isChecked: boolean) {
    task.completed = isChecked;
    this.taskCompleted.emit(task);
  }

  editTask(task: Task) {
    this.edit.emit(task);
  }

  deleteTask(task: Task) {
    this.delete.emit(task);
  }

  updateTasks(newTasks: Task[]) {
    this.tasks = [...newTasks]; // Cambiamos la referencia para que Angular detecte el cambio
    console.log('Tareas actualizadas en TaskList:', this.tasks);
  }
}
