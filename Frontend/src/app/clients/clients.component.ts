import { Component, OnInit } from '@angular/core';

import { Client } from '../models/client.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientsService } from '../services/clients/client.service';
import { BoiteAjoutClientComponent } from '../boitesDialogues/boite-ajout-client/boite-ajout-client.component';
import { ModalConfirmComponent } from '../boitesDialogues/modal-confirm/modal-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
selector: 'app-clients',
templateUrl: './clients.component.html',
styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
searchText!: string;
TabClients: Client[] = [];
bsModalRef!: BsModalRef;
modalRef!: BsModalRef;
constructor(private modalService: BsModalService, private clientService : ClientsService,private toastr: ToastrService) { }

ngOnInit(): void {
this.getClients();
}

getClients(): void {
this.clientService.getClients().subscribe(
(clients: any) => {
this.TabClients = clients;
this.TabClients.reverse()
},
(error) => {
console.log('Error fetching clients:', error);
}
);
}

ouvrirModalAjoutClient(): void {
const modalRef = this.modalService.show(BoiteAjoutClientComponent);
modalRef.content!.modalClosed.subscribe(() => {
this.getClients();
});
}

delete(clientId: any): void {
  const initialState = {
    action : 'delete'
};
  this.modalRef = this.modalService.show(ModalConfirmComponent, { initialState });
  this.modalRef.content.modalClosed.subscribe((result: boolean) => {
   // console.log('Modal closed with result:', result);
    if(result){
        this.clientService.deleteClient(clientId).subscribe(
        () => {
        //console.log('Client deleted successfully');
        this.toastr.success('Client suuprimé avec succès', 'Succès');
        this.getClients();
        },
        (error) => {
        //console.log('Error deleting client:', error);
        this.toastr.error('Erreur lors de la suppression du client', 'Erreur');
       
        }
        );}})
}

update(clientId: any): void {
const initialState = {
clientId: clientId
};
const modalRef = this.modalService.show(BoiteAjoutClientComponent, { initialState });
modalRef.content!.modalClosed.subscribe(() => {
this.getClients();
});
}

search(): void {
  // Manipuler le texte saisi (exemple : affichage dans la console)
 // console.log('Texte saisi :', this.searchText);


  if (this.searchText.trim() !== '') {

    this.TabClients = this.TabClients.filter((client) =>
      client.nom.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
    //console.log('searchRes', this.TabClients)
  } else {
    this.getClients();
  } 
  
} 

handleKeyDown(event: KeyboardEvent): void {
  if (event.keyCode === 8) { // Vérifier si la touche pressée est le bouton de suppression (Backspace)
    if (this.searchText.length > 0) {
      this.searchText = ''; // Supprimer le dernier caractère de la chaîne searchText
      this.search(); // Appeler la méthode search() pour mettre à jour les résultats de recherche
    }
  }
}

}