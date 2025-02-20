import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../shared/models/tasks';

@Component({
  selector: 'app-tasks-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './tasks-modal.component.html',
  styleUrl: './tasks-modal.component.scss'
})
export class TasksModalComponent {

  taskForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TasksModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {
    this.isEditMode = !!data.task;
    this.taskForm = this.formBuilder.group({
      title: [data.task?.title || '', Validators.required],
      description: [data.task?.description || '', Validators.required],
      completed: [data.task?.completed || false],
    })
  }

  save() {
    if(this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value)
    }
  }
}
