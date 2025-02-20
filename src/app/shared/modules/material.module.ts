import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
