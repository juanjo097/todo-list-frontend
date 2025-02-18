import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

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

  constructor(private router: Router, private formBuilder: FormBuilder, private dialog : MatDialog) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      console.log('Validating email:', email);

      // this.dialog.open(AddUserModalComponent);

      const existingUsers = ['user@example.com', 'admin@example.com'];
      if (existingUsers.includes(email)) {
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      } else {
        this.userNotFound = true;
      }
    }
  }
}
