import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BoiteInfoComponent } from 'src/app/boitesDialogues/boite-info/boite-info.component';
import { CommandeService } from 'src/app/services/commandes/commandes.service';

@Component({
  selector: 'app-imprimer-commande',
  templateUrl: './imprimer-commande.component.html',
  styleUrls: ['./imprimer-commande.component.css']
})
export class ImprimerCommandeComponent {
  TabCommandes: any;
  bsModalRef!: BsModalRef;

  
  constructor(private commandesService: CommandeService,private modalService: BsModalService,private router : Router) {}

 

  btnValiderClick(typeFiltre: string): void {
    const typeCommandeElement = document.getElementById('typeCommande') as HTMLSelectElement;
    const typeChoisi = typeCommandeElement.value;
    console.log('Type choisi :', typeChoisi);
    this.getCommandesParType(typeChoisi);
  }

  getCommandesParType(typeFiltre: string): void {
    this.commandesService.getCommandes().subscribe(
      (res) => {
        let data: any = res;
        this.TabCommandes = data
          .filter((commande: any) => commande.type === typeFiltre)
          .map((commande: any) => {
            const formattedDate = format(new Date(commande.date), 'dd/MM/yyyy');
            return {
              ...commande,
              date: formattedDate
            };
          });
          this.TabCommandes.reverse()
        console.log('Commandes filtrées par type', this.TabCommandes);
      },
      (err) => {
        console.log('Erreur lors de la récupération des commandes', err);
      }
    );
  }

  view(id :number){ 
    const initialState = {
      id: id
    };
    this.bsModalRef = this.modalService.show(BoiteInfoComponent, { initialState } );
  }

  imprimer(id : any){
    this.router.navigate(['/imprimer-bon-livraison'], { queryParams: { commandeId: id } });
    
  }

}
