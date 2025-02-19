import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ MaterialModule ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() length = 0;
  @Input() pageSize = 3;
  @Output() pageChanged = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.subscribe(event => {
      console.log('Evento de paginación detectado:', event);
      this.pageChanged.emit(event);
    });
  }
}
