import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-search-date',
  templateUrl: './nav-search-date.component.html',
  styleUrls: ['./nav-search-date.component.css']
})
export class NavSearchDateComponent {
  searchDate!: string;

  search() {
    console.log('Date:', this.searchDate);
    // Vous pouvez effectuer d'autres actions avec la valeur de la date ici
  }
}
