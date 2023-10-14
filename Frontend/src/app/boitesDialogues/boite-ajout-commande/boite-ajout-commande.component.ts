import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Commande } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commandes/commandes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-boite-ajout-commande',
  templateUrl: './boite-ajout-commande.component.html',
  styleUrls: ['./boite-ajout-commande.component.css']
})
export class BoiteAjoutCommandeComponent {
valider() {
throw new Error('Method not implemented.');
}
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  @ViewChild('addForm', { static: false }) addForm!: NgForm;
  
  id!: number;
  bsModalRef!: BsModalRef;
  num!:number
  commande!: Commande;
  commandeId!: any;
  date!: Date;
  quantite!: number;
  prixTotal!: number;

  TabArticles: Article[] = [];
  TVA!: number;
  TimbreFiscal!: string;
  TabCommandes: any;
articles: any;
client: any;
adresse: any;
telephone: any;
mf: any;
type: any;

  constructor(
    private modalService: BsModalService,
    private articlesService: ArticlesService,
    private commandesService: CommandeService
  ) { }

  openModal(template: any) {
    this.bsModalRef = this.modalService.show(template);
  }

  annuler() {
    this.modalService.hide();
  }

  ngOnInit() {
    if (this.commandeId) {
      this.setData();
    }
    this.getCommandes();
  }

  setData() {
    this.commandesService.getCommandeById(this.commandeId).subscribe((commande: Commande) => {
      this.commande = {
        _id: 0,
        num: 0,
        type : '',
        client: '',
        articles: [],
        date: this.date,
        TotalMontant: 0,
        TVA: 0,
        timbreFiscal: '',
        totalNetTTC: 0,
        chauffeur :'',
        matriculeCamion : 0,
        somme : ''
      };
    });
  }

  onAddCommande(addForm: NgForm): void {
    let newCommande: any = {
     
      num: this.num, // Le numéro de commande sera généré automatiquement côté serveur
      client: '', // Le client sera défini dans setData() ou dans la logique de sélection du client
      article: [], // L'article sera défini dans setData() ou dans la logique de sélection de l'article
      date: this.date,
      TotalMontant: 0,
      TVA: this.TVA,
      TimbreFiscal: this.TimbreFiscal,
      TotalNetTTC: 0
    };

    this.commandesService.addCommande(newCommande).subscribe(
      (response) => {
        console.log(response);
        this.getCommandes();
        this.modalClosed.emit();
        this.modalService.hide();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onUpdateCommande(): void {
    this.commande = {
      _id: 0,
      num: 0,
      type:'',
      client: '',
      articles: [],
      date: this.date,
      TotalMontant: 0,
      TVA: this.TVA,
      timbreFiscal: this.TimbreFiscal,
      totalNetTTC: 0,
      chauffeur :'',
        matriculeCamion : 0,
        somme : ''
    };
  
    this.commandesService.updateCommande(this.commande._id, this.commande).subscribe(
      (response) => {
        console.log(response);
        this.getCommandes();
        this.modalClosed.emit();
        this.modalService.hide();
        //this.toastr.success('Commande a été modifiée !', 'Succès');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //this.toastr.error('La commande ne peut pas être modifiée !', 'ERREUR');
      }
    );
  }
  

  getCommandes() {
    this.commandesService.getCommandes().subscribe(
      (res) => {
        let data: any = res;
        this.TabCommandes = data;
        console.log('res getCommandes', this.TabCommandes);
      },
      (err) => {
        console.log('erreur getCommandes');
      }
    );
  }
  
}
