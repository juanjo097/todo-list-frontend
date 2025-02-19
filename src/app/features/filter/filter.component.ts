import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ MaterialModule ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange(event: Event) {
    const filterText = (event.target as HTMLInputElement).value;
    this.filterChanged.emit(filterText);
  }

}
