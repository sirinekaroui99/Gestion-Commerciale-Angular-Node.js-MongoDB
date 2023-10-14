import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_GestionStock';
// Variable pour stocker l'état du sidebar

isSidebarOpen: boolean = true;
selectedItem: string = ''; 
selectedItemSublist : string = ''
isLoginComponent: boolean = false;
isCommandeSublistOpen: boolean = false;
sousListeCommandeOuverte = false
constructor(private router: Router,private location:Location,private authService:AuthService) {

}


ngOnInit() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.isLoginComponent = event.url === '/login'; // Adjust the URL according to your login component route
    }
  }); 
  this.getLocation();
}


getLocation(): void {
  const path = this.location.path();
  switch (path) {
    case '/':
      this.selectedItem = 'accueil';
      break;
    case '/articles':
      this.selectedItem = 'articles';
      break;
     
    case '/clients':
      this.selectedItem = 'clients';
      break;
    case '/commandes':
      this.selectedItem = 'commandes';
      this.sousListeCommandeOuverte = true
      this.selectedItemSublist = 'liste-commande';
      break;
    case '/ajouter-commande':
      this.selectedItem = 'commandes';
      this.sousListeCommandeOuverte = true
      
      this.selectedItemSublist = 'ajouter-commande';
      break;
    case '/imprimer-commande':
      this.selectedItem = 'commandes';
      this.sousListeCommandeOuverte = true
      this.selectedItemSublist = 'imprimer-commande';
      break;
    default:
      this.selectedItem = '';
      break;
  }
}
reloadComponent() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl(currentUrl);
  });
}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  selectItem(item: string) {
    this.selectedItem = item;
    if(this.selectedItem == 'commandes' ){
    console.log('eee',this.selectedItem)
    this.sousListeCommandeOuverte = true
      if(this.selectedItemSublist == 'ajouter-commande'){
        
        this.router.navigateByUrl('/ajouter-commande');
        this.reloadComponent();
      }

  }
    else{
      this.sousListeCommandeOuverte = false
      this.selectedItemSublist =''
    }
  }

  selectItemSublist(item: string){
    this.selectedItemSublist = item
     
  }

  deconnexion(){
    this.authService.logout()
  }
}
