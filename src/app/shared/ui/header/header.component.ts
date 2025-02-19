import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = 'To-Do List';

  constructor(private router: Router) {}

  logout() {
    // this.authService.logout();
    this.router.navigate(['/']);
  }
}
