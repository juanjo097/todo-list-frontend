import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}

}
