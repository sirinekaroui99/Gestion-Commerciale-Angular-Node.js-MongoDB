import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.css']
})
export class NavSearchComponent {
  searchText!: string;

  search(): void {
    // Manipuler le texte saisi (exemple : affichage dans la console)
    console.log('Texte saisi :', this.searchText);

    // Réinitialiser le champ de recherche
    this.searchText = '';
  }
}
