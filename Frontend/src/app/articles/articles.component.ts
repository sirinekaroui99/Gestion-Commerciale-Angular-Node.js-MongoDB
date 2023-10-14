import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles/articles.service';
import { Article } from '../models/article.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BoiteAjoutArticleComponent } from '../boitesDialogues/boite-ajout-article/boite-ajout-article.component';
import { ModalConfirmComponent } from '../boitesDialogues/modal-confirm/modal-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  searchText!: string;
  TabArticles : Article[] = []
  bsModalRef!: BsModalRef;
  modalRef!: BsModalRef;
  deleteConfirm : boolean = false;
  searchResults!: any[]; // Remplacez any[] par le type approprié pour vos résultats de recherche

  
  ngOnInit(){
    this.getArticles()
  }

  constructor(private articlesService : ArticlesService,private modalService: BsModalService,private toastr: ToastrService){
    this.searchText = '';
    this.TabArticles = []; // Initialisez votre tableau d'articles avec les données appropriées
    this.searchResults = [];
  }

  search(): void {
    // Manipuler le texte saisi (exemple : affichage dans la console)
    //console.log('Texte saisi :', this.searchText);
 

    if (this.searchText.trim() !== '') {

      this.TabArticles = this.TabArticles.filter((article) =>
        article.designation.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
     // console.log('searchRes', this.TabArticles)
    } else {
      this.getArticles();
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

  ouvrirModalAjoutArticle() {   
      const modalRef = this.modalService.show(BoiteAjoutArticleComponent);
    modalRef.content!.modalClosed.subscribe(() => {
      this.getArticles()   ;
   // Rafraîchir les données ici
  });
     
  }

  delete(id: any) {
    const initialState = {
      action : 'delete'
  };
    this.modalRef = this.modalService.show(ModalConfirmComponent, { initialState });
    this.modalRef.content.modalClosed.subscribe((result: boolean) => {
     // console.log('Modal closed with result:', result);
      if (result) {
        this.articlesService.deleteArticle(id).subscribe(
          res => {
            //console.log('article deleted successfully');
            this.toastr.success('Article supprimé avec succès', 'Succès');
            this.getArticles();
          },
          err => {
            this.toastr.error('Erreur lors de la suppression de l\'article', 'Erreur');
            //console.log('error delete', err);
          }
        );
      }
    });
  }
  

  update(id : any){
   // console.log('id update', id)
    const initialState = {
      id: id
  };
  const modalRef = this.modalService.show(BoiteAjoutArticleComponent, { initialState });
    modalRef.content!.modalClosed.subscribe(() => {
      this.getArticles()   ;
   // Rafraîchir les données ici
  });
  }


  getArticles(){
    this.articlesService.getArticles().subscribe(
      res => {
        let data : any = res
        this.TabArticles = data
        console.log('res getArticles', this.TabArticles)
      },
      err => {
        console.log('erreur getArticles')
      }
    )
  }

}
