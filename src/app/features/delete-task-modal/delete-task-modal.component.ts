import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './delete-task-modal.component.html',
  styleUrl: './delete-task-modal.component.scss'
})
export class DeleteTaskModalComponent {

  constructor(
    private dialogRef : MatDialogRef<DeleteTaskModalComponent>
  ){}

  confirmDelete() {
    this.dialogRef.close('yes')
  }
}
