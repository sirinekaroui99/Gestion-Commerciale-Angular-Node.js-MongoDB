import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Commande } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commandes/commandes.service';

@Component({
  selector: 'app-boite-info',
  templateUrl: './boite-info.component.html',
  styleUrls: ['./boite-info.component.css']
})
export class BoiteInfoComponent {

  commande: Commande; // Replace with the actual type of your command object
  id : any
  facture = false
  constructor(private modalService: BsModalService,private commandeService : CommandeService) {
    // Initialize the command object with all required properties
    this.commande = {
      _id: '',
      num: '',
      type: '',
      date: new Date(),
      client: {
        nom: '',
        adresse: '',
        telephone: '',
        mf: ''
      },
      articles: [],
      somme : '',
      TotalMontant: 0,
      TVA: 0,
      timbreFiscal: '',
      totalNetTTC: 0,
      chauffeur : '',
      matriculeCamion : 0
    };
  }
ngOnInit(){
 //console.log('id',this.id)
  this.getCommandeById()
}

getCommandeById(){
this.commandeService.getCommandeById(this.id).subscribe(
  res => {
   // console.log('result get commande by id',res)
    this.commande = res
   // console.log('articles de la commande',this.commande.articles)
    if(this.commande.type == 'facture'){
      this.facture = true
    }
  },
  err => {
    console.log('err',err)
  }
)
}
   
  annuler() {
    // this.bsModalRef.hide();
    // window.location.href = 'http://localhost:4200/basic/vols'; 
     this.modalService.hide() ; 
   }

}
