import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open(
        'Por favor, completa el formulario correctamente.',
        'Cerrar',
        {
          duration: 2000,
        }
      );
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const { email, password } = this.loginForm.value;
      if (email === 'test@test.com') {
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open(
          'Credenciales incorrectas. Intenta de nuevo.',
          'Cerrar',
          {
            duration: 2000,
          }
        );
      }
      this.isLoading = false;
    }, 2000);
  }
}
