import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/services/commandes/commandes.service';

@Component({
  selector: 'app-bon-livraison',
  templateUrl: './bon-livraison.component.html',
  styleUrls: ['./bon-livraison.component.css']
})
export class BonLivraisonComponent {
  id : any
  commandeId : any
  commande : any
  typeCmdFacture = false;
  typeCmdBonLivraison = false
  constructor(private route: ActivatedRoute,private commandeService : CommandeService){}
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.commandeId = params['commandeId'];
     // console.log('id commande1', this.commandeId)
      // Faites ce que vous voulez avec la valeur de commandeId
    });
    this.getCommandeById();
  }

  printPage(): void {
    window.print();
  }

  getCommandeById() {
    this.commandeService.getCommandeById(this.commandeId).subscribe(
      res => {
        //console.log('commande à imprimer', res);
        this.commande = res;
        if (this.commande.type === 'facture') {
          this.typeCmdFacture = true
          this.commande.type = 'Facture';
        } else if (this.commande.type === 'bonLivraison') {
          this.commande.type = 'Bon de Livraison';
          this.typeCmdBonLivraison = true
        } else if (this.commande.type === 'devis') {
          this.commande.type = 'Devis';
          this.typeCmdBonLivraison = true
        }
        
        // Transforming the date format
        const dateObj = new Date(this.commande.date);
        this.commande.date = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      },
      err => {
        console.log('erreur', err);
      }
    );
  }
  
  
}
