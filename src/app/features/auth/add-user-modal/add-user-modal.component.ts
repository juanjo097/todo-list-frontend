import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatDialogModule, MaterialModule, CommonModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent {
  createUserForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddUserModalComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService : AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {email: string}
  ) {
    this.createUserForm = this.formBuilder.group({
      email: [this.data?.email||"", [Validators.required, Validators.email]],
    });
  }

  saveUser() {
    if (this.createUserForm.valid) {
      this.authService.createUser(this.createUserForm.value).subscribe({
        next : ({data, message}) => {
          if(data && message === 'success') {
            const { email, userId } = data;
            if (email && userId) {
              sessionStorage.setItem('userId', userId);
              this.snackBar.open('User created successfully, redirecting to dashboard',
                'Close', {
                  duration : 2000
                }
              )
            }
            this.dialogRef.close('success');
          }
        },
        error : (error) => { console.error(error) }
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
