import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boite-ajout-article',
  templateUrl: './boite-ajout-article.component.html',
  styleUrls: ['./boite-ajout-article.component.css']
})
export class BoiteAjoutArticleComponent {
  @ViewChild('addForm', { static: false }) addForm!: NgForm;
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  bsModalRef!: BsModalRef;
  article! : Article
  reference:any
  modalRef!: BsModalRef;
  isModal: boolean = true;
    designation!: string;
    prixAchat!: number;
    prixVente!: number;
    fournisseur!: string;
    quantiteEnStock!: number;
    emplacementDansBoutique!: string;
    emplacementDansdepot!: string;
    quantiteVendu!:number
   
  id:any
  TabArticles : Article[] = []
  public articles!: Article[];
  constructor(private toastr: ToastrService,
    private modalService: BsModalService,  
    private articlesService : ArticlesService
  
  ) { }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

 
  annuler() {
    const initialState = {
      action: 'add'
    };
    this.modalRef = this.modalService.show(ModalConfirmComponent, { initialState });
    this.modalRef.content.modalClosed.subscribe((result: boolean) => {
     // console.log('result Modal closed:', result);
      if (result) {
        this.isModal = true;
        this.modalService.hide();
        this.modalClosed.emit(true);
      } else {
          
          this.modalRef.hide()
          // La boîte de confirmation a été annulée, donc on ne ferme pas la boîte d'ajout.
          // Vous pouvez ajouter d'autres traitements ici si nécessaire.
           
      }
    });
  }
  
  
  
  

  ngOnInit(){
   // console.log('id',this.id)
    //this.openModal(AjoutVolsComponent)
    if(this.id){
      this.setData();
    }
    this.getArticles()
    
  }
  setData(){
    this.articlesService.getArticleById(this.id).subscribe((article : any) => {
      this.reference = article.reference
      this.designation = article.designation
      this.prixAchat = article.prixAchat
      this.prixVente = article.prixVente
      this.fournisseur = article.fournisseur
      this.quantiteEnStock = article.quantiteEnStock
      this.emplacementDansBoutique = article.emplacementDansBoutique
      this.emplacementDansdepot = article.emplacementDansdepot
      this.quantiteVendu = article.quantiteVendu
    });
  }

  public onUpdateArticle(articleForm :any) : void{ 
    if(articleForm.valid){
    this.article = {
      _id : this.id,
      reference : this.reference,
      designation : this.designation,
      prixAchat : this.prixAchat,
      prixVente : this.prixVente,
      fournisseur : this.fournisseur,
      quantiteEnStock : this.quantiteEnStock,
      emplacementDansBoutique : this.emplacementDansBoutique,
      emplacementDansdepot : this.emplacementDansdepot,
      quantiteVendu : this.quantiteVendu

    }
    this.articlesService.updateArticle(this.article._id,this.article).subscribe(
      (response) => {
        this.toastr.success('Article modifié avec succès', 'Succès');
       // console.log(response);
        this.getArticles();   
        this.modalClosed.emit() ; 
        this.modalService.hide() ; 
    
       
        //this.toastr.success('Flight was Edited!','success' ); 

      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.toastr.error('Erreur lors de la modification de l\'article', 'Erreur');
        //this.toastr.error('Flight can not be edited!','ERROR' );
      }
    );}else{
     // console.log('formulaire non valide')
      this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
    }
    
  }
  public onAddArticle(addForm: NgForm,articleForm : any): void {

    if(articleForm.valid){
    let article : any = {
      reference : this.reference,
      designation : this.designation,
      prixAchat : this.prixAchat,
      prixVente : this.prixVente,
      fournisseur : this.fournisseur,
      quantiteEnStock : this.quantiteEnStock,
      emplacementDansBoutique : this.emplacementDansBoutique,
      emplacementDansdepot : this.emplacementDansdepot,
      quantiteVendu : this.quantiteVendu
    }
    
    //document.getElementById('add-flight-form')!.click();
   // console.log('add form',article)
    this.articlesService.addArticle(article).subscribe(
      (response) => {
       // console.log(response);
        this.toastr.success('Article ajouté avec succès', 'Succès');
        this.getArticles();   
        this.modalClosed.emit() ; 
        this.modalService.hide() ; 
        //addForm.reset();
        //this.toastr.success('Flight was added!', 'Success');
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.toastr.error('Erreur lors de l\'ajout de l\'article', 'Erreur');
        //addForm.reset();
        //this.toastr.error('Flight cannot be added!', 'Error');
      }
    );
  }else{
   // console.log('formulaire non valide')
    this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
  }
  } 
  getArticles(){
    this.articlesService.getArticles().subscribe(
      res => {
        let data : any = res
        this.TabArticles = data
       // console.log('res getArticles', this.TabArticles)
      },
      err => {
        console.log('erreur getArticles')
      }
    )
  }

}
