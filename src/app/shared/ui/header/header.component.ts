import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = 'To-Do List';

  constructor(public authService: AuthService) {}

}
