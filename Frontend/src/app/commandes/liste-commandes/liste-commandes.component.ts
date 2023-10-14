import { Component, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BoiteAjoutCommandeComponent } from 'src/app/boitesDialogues/boite-ajout-commande/boite-ajout-commande.component';
import { Commande } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commandes/commandes.service';
import { format } from 'date-fns';
import { BoiteInfoComponent } from 'src/app/boitesDialogues/boite-info/boite-info.component';
import { AjoutCommandeComponent } from '../ajout-commande/ajout-commande.component';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from 'src/app/boitesDialogues/modal-confirm/modal-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-commandes',
  templateUrl: './liste-commandes.component.html',
  styleUrls: ['./liste-commandes.component.css']
})
export class ListeCommandesComponent {
  searchDate!: string;
  TabCommandes: Commande[] = [];
  TabFiltrer : any
  bsModalRef!: BsModalRef;
  commandeId : any
  modalRef!: BsModalRef;
  searchResults!: any[]; // Remplacez any[] par le type approprié pour vos résultats de recherche

  ngOnInit() {
    this.getCommandes();
  }

  constructor(private commandesService: CommandeService, private modalService: BsModalService,
    private router : Router,
    private toastr: ToastrService) {
    this.searchDate = '';
    this.TabCommandes = []; // Initialisez votre tableau de commandes avec les données appropriées
    this.searchResults = [];
  }

  transformDate(dateString: string): any {
    const dateParts = dateString.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
  
    return `${day}/${month}/${year}`;
  }

  
  search(): void {
    const formattedDate = this.transformDate(this.searchDate);
    if (this.searchDate.trim() !== '') {
      const filteredTab = this.TabCommandes.filter((commande) => {
        return formattedDate === commande.date;
      });
      //console.log('Résultats de recherche', filteredTab);
       
      if (filteredTab.length === 0) {
        //console.log('Aucun résultat');
        this.getCommandes();
      } else {
        this.TabFiltrer = filteredTab;
      }
    } else {
      this.getCommandes();
    }
  }
  
  

  handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === 8) {
      // Vérifier si la touche pressée est le bouton de suppression (Backspace)
      if (this.searchDate.length > 0) {
        this.searchDate = ''; // Supprimer le dernier caractère de la chaîne searchDate
        this.search(); // Appeler la méthode search() pour mettre à jour les résultats de recherche
      }
    }
  }

  ouvrirModalAjoutCommande() {
    const modalRef = this.modalService.show(BoiteAjoutCommandeComponent);
    modalRef.content!.modalClosed.subscribe(() => {
      this.getCommandes();
      // Rafraîchir les données ici
    });
  }

  view(id :number){ 
    const initialState = {
      id: id
    };
    this.bsModalRef = this.modalService.show(BoiteInfoComponent, { initialState } );
  }
  

  delete(id: any) {
    const initialState = {
      action : 'delete'
  };
    this.modalRef = this.modalService.show(ModalConfirmComponent, { initialState });
    this.modalRef.content.modalClosed.subscribe((result: boolean) => {
     // console.log('Modal closed with result:', result);
      if(result){
         this.commandesService.deleteCommande(id).subscribe(
      (res) => {
       // console.log('Commande deleted successfully');
       this.toastr.success('Commande supprimé avec succès', 'Succès');
        this.getCommandes();
      },
      (err) => {
        //console.log('Error deleting Commande', err);
        this.toastr.error('Erreur lors de la suppression de la commande', 'Erreur');
      }
    );
      }})
    
  }

  update(commandeId: any) {
    //console.log('Update ID', commandeId);
  
  this.router.navigate(['/ajouter-commande'], { queryParams: { commandeId: commandeId } });
 
  }

  getCommandes() {
    this.commandesService.getCommandes().subscribe(
      (res) => {
        let data: any = res;
        this.TabCommandes = data.map((commande: any) => {
          const formattedDate = format(new Date(commande.date), 'dd/MM/yyyy');
          return {
            ...commande,
            date: formattedDate
          };
        });
        this.TabCommandes.reverse();
        this.TabFiltrer = [...this.TabCommandes]; // Initialiser TabFiltrer avec les données complètes
        
        //console.log('getCommandes response', this.TabCommandes);
      },
      (err) => {
        console.log('Error getting Commandes', err);
      }
    );
  }
}
