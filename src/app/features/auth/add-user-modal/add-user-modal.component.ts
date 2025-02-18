import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ MatDialogModule ],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss'
})
export class AddUserModalComponent {

  constructor( private dialogRef : MatDialogRef<AddUserModalComponent> ) { }

  close() {
    this.dialogRef.close();
  }
}
