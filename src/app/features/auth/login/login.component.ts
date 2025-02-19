import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  userNotFound = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openAddModal() {
    this.dialog.open(AddUserModalComponent, {
      height: '300px',
      width: '400px',
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please complete the form correctly.', 'Close', {
        duration: 2000,
      });
      return;
    }
    this.isLoading = true;
    const { email } = this.loginForm.value;
    this.authService.login(email).subscribe({
      next: (rsp) => {
        const { data, message } = rsp;
        // if user exists redirect to dashboard
        if (data) {
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        } else {
          // lets declare our modal in case the user not exists
          let dialogRef = this.dialog.open(AddUserModalComponent, {
            height: '300px',
            width: '360px',
            data: { email },
          });
          // after close modal and if is success redirect to dashboard
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) {
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
            } else {
              this.snackBar.open('An error has ocurred.', 'Close', {
                duration: 2000,
              });
            }
          });
        }
      },
      error: (error) => {
        console.error('Login Error', error);
      },
    });
  }
}
