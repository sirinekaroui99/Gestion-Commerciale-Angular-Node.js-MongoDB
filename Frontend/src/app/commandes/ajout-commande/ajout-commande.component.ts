import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ArticlesCommande } from 'src/app/models/ArticlesCommande.model';
import { Article } from 'src/app/models/article.model';
import { Commande } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commandes/commandes.service';
import { DatePipe, Location } from '@angular/common';
import { ClientsService } from 'src/app/services/clients/client.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from 'src/app/boitesDialogues/modal-confirm/modal-confirm.component';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajout-commande',
  templateUrl: './ajout-commande.component.html',
  styleUrls: ['./ajout-commande.component.css']
})
export class AjoutCommandeComponent {
  articles: ArticlesCommande[] = []; // Tableau pour stocker les lignes de commande
  //@Output() modalClosed: EventEmitter<any> = new EventEmitter();
  commandeId: any
  client!: any;
  adresse!: any;
  telephone!: any;
  mf!: any;
  num!: any;
  type!: any;
  typeCmdFacture = false
  date!: any;
  TotalMontant: number = 0;
  TVA: number = 0;
  timbreFiscal: number = 1 ;
  totalNetTTC!: number;
  matriculeCamion ='';
  chauffeur =''
  somme = ''
  //commandeId! : any
  commande : any
  ajouterRoute = false;
  bsModalRef!: BsModalRef;
  modalRef!: BsModalRef;
  nouveauUrl : boolean = false
  nomArticles: string[] = []; // Déclarer le tableau nomArticles
  refArticles: any;
  selectedArticleIndex: number = -1;
  article : any
  suggestions: any[] = [];
  tabClients: any; 
  TabArticlesValide = false
  k = 0;
  TotalMontantValide = false
  tabArticles: any;
  designationArticle = ''
  clientByName: any;
  nom: any;
  constructor(private commandesService:CommandeService,
    private route: ActivatedRoute,
    private location: Location,
    private router:Router,
    private modalService: BsModalService,
    private clientService : ClientsService,
    private articleService : ArticlesService,
    private datePipe: DatePipe,
    private toastr: ToastrService){
      // Obtenez la date actuelle et formatez-la
    const currentDate = new Date();
    this.date = this.datePipe.transform(currentDate, 'dd/mm/yyyy');
    }

  ngOnInit(){
    this.getArticles()
    this.getClients()
    //this.getCommandes()
    this.getCurrentDate()
  //  this.router.events.subscribe(event => {
     // if (event instanceof NavigationStart) {
        // L'événement NavigationStart est déclenché avant chaque changement d'URL
        // Vous pouvez ajouter votre logique ici pour réagir au changement d'URL courante
        //console.log('URL courante :', event.url);
        //if(event.url !== '/ajouter-commande'){
          //this.handleURLChange(event.url);
        //}
      //}
    //});
    this.route.queryParams.subscribe(params => {
      this.commandeId = params['commandeId'];
      //console.log('id commande1', this.commandeId)
      // Faites ce que vous voulez avec la valeur de commandeId
    });
    if (this.commandeId) {
      this.setData();
    }  

   

    const currentRoute = this.location.path();
    
    if(currentRoute == '/ajouter-commande'){
      this.ajouterRoute = true
      
    }else{
      this.ajouterRoute = false
    }
  }

  onClientSelect(event: any): void {
    this.client = event.target.value;
    this.clientService.getClientByName(this.client).subscribe(
      res => {
       // console.log('res client by nom', res )
        this.setClientData(res)
      }
    )
  }

  getCurrentDate() {
    // Obtenez la date actuelle
    const currentDate = new Date();

    // Formatez la date au format "yyyy-MM-dd"
    this.date = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }

 
  

  getArticleByRef(ref: string, i : any) {
    //console.log('ref',ref)
    this.articleService.getArticleByRef(ref).subscribe(
      (article: any) => {
        this.article = article
        // Mettre à jour les autres champs de l'article avec les détails récupérés
        this.articles[i].reference = ref
        this.articles[i].designation = article.designation;
        this.articles[i].quantite = 0;
        this.articles[i].prixVente = article.prixVente;
        this.articles[i].total = 0;
      },
      (error) => {
        console.log('Erreur lors de la récupération de l\'article', error);
      }
    );
  }
  
  getArticleByDesignation(designation: string, i : any) {
    
    this.articleService.getArticleByDesignation(designation).subscribe(
      (article: any) => {
        //console.log('article', article)
        this.article = article
        //console.log('vvvvvvvvvvvv',article)
        // Mettre à jour les autres champs de l'article avec les détails récupérés
        this.articles[i].reference = article.reference;
        this.articles[i].designation = designation
        this.articles[i].quantite = 0;
        this.articles[i].prixVente = article.prixVente;
        this.articles[i].total = 0;
         
      },
      (error) => {
        console.log('Erreur lors de la récupération de l\'article', error);
      }
    );
  }

  onClientBlur(){
    const input = document.getElementById(`client`) as HTMLInputElement;
     this.nom = input.value
    const suggestionsContainer = document.getElementById(`suggestionsClient`);
  
    // Define and populate the options array with suggestions
    const options = this.tabClients
      .map((article: { nom: any }) => article.nom)
      .filter((option: string | null) => option !== null) as string[];
  
    input.addEventListener('input', () => {
      const value = input.value;
      const filteredOptions = options.filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
  
      suggestionsContainer!.innerHTML = '';
      filteredOptions.forEach((option: string) => {
        const suggestion = document.createElement('div');
        suggestion.textContent = option;
        suggestion.classList.add('suggestion');
        suggestion.addEventListener('click', () => {
          input.value = option;
          suggestionsContainer!.innerHTML = ''; 
  this.client = input.value
  //console.log('client', this.client)
          this.setClientData(this.client)
        });
        suggestionsContainer!.appendChild(suggestion);
      });
  
      // Apply scrollbar if the number of options exceeds 5
      if (filteredOptions.length > 8) {
        suggestionsContainer!.style.overflow = 'auto';
        suggestionsContainer!.style.maxHeight = '100px'; // Adjust the desired max height
      } else {
        suggestionsContainer!.style.overflow = 'visible';
        suggestionsContainer!.style.maxHeight = 'none';
      }
    });
  } 
  
  
  onTypeBlur(type : any){
    if(type == 'facture'){
      this.typeCmdFacture = true
    }else{
      this.typeCmdFacture = false
    }

    this.getCommandes()

  }

  
 
  
  onDesignationBlur(index: number) {
    const input = document.getElementById(`designation-${index}`) as HTMLInputElement;
    const suggestionsContainer = document.getElementById(`suggestionsDesignation-${index}`);
  console.log('desgination', input.value)
    // Define and populate the options array with suggestions
    const options = this.tabArticles
      .map((article: { designation: any }) => article.designation)
      .filter((option: string | null) => option !== null) as string[];
  
    input.addEventListener('input', () => {
      const value = input.value;
      const filteredOptions = options.filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
  
      suggestionsContainer!.innerHTML = '';
      filteredOptions.forEach((option: string) => {
        const suggestion = document.createElement('div');
        suggestion.textContent = option;
        suggestion.classList.add('suggestion');
        suggestion.addEventListener('click', () => {
          input.value = option;
          suggestionsContainer!.innerHTML = '';
          this.designationArticle = input.value;
  
          this.getArticleByDesignation(this.designationArticle, index);
        });
        suggestionsContainer!.appendChild(suggestion);
      });
  
      // Apply scrollbar if the number of options exceeds 5
      if (filteredOptions.length > 8) {
        suggestionsContainer!.style.overflow = 'auto';
        suggestionsContainer!.style.maxHeight = '100px'; // Adjust the desired max height
      } else {
        suggestionsContainer!.style.overflow = 'visible';
        suggestionsContainer!.style.maxHeight = 'none';
      }
    });
  }
  
  
  
  onRefBlur(index: number) {
    const input = document.getElementById(`reference-${index}`) as HTMLInputElement;
    const suggestionsContainer = document.getElementById(`suggestions-${index}`);
  
    // Define and populate the options array with suggestions
    const options = this.refArticles
    
      .map((article: { reference: any }) => article.reference)
      .filter((option: string | null) => option !== null && typeof option === 'string') as string[];
  //console.log('options', this.refArticles)
    input.addEventListener('input', () => {
      const value = input.value;
      const filteredOptions = this.refArticles.filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
  
      suggestionsContainer!.innerHTML = '';
      filteredOptions.forEach((option: string) => {
        const suggestion = document.createElement('div');
        suggestion.textContent = option;
        suggestion.classList.add('suggestion');
        suggestion.addEventListener('click', () => {
          input.value = option;
          suggestionsContainer!.innerHTML = ''; 
  
          this.getArticleByRef(input.value, index);
        });
        suggestionsContainer!.appendChild(suggestion);
      });
  
      // Apply scrollbar if the number of options exceeds 8
      if (filteredOptions.length > 8) {
        suggestionsContainer!.style.overflow = 'auto';
        suggestionsContainer!.style.maxHeight = '100px'; // Adjust the desired max height
      } else {
        suggestionsContainer!.style.overflow = 'visible';
        suggestionsContainer!.style.maxHeight = 'none';
      }
    });
  }
  
  
  
  

  onQuantiteBlur(article: any, index: number) {
    //console.log('quantité',this.article)
    // Récupérer la quantité saisie dans la variable "article.quantite"
    const quantite = article.quantite;
    
    // Vérifier la disponibilité de la quantité dans le stock
    if (quantite > this.article.quantiteEnStock) {
      //console.log('Quantité indisponible dans le stock');
      this.toastr.warning('La quantité est indisponible dans le stock', 'Avertissement');
  
      this.TotalMontant = this.TotalMontant - this.articles[index].total;
      this.articles[index].total = 0;
      
      // Ajoutez ici le code pour gérer le cas où la quantité saisie est indisponible dans le stock, par exemple afficher un message à l'utilisateur.
    } else {
      // Effectuer les actions nécessaires avec la quantité récupérée
      //console.log('Quantité saisie:', quantite);
      
      this.articles[index].total = quantite * article.prixVente;
      this.TotalMontant = this.TotalMontant + this.articles[index].total;
      if(this.type == 'facture' && this.TVA){
        this.totalNetTTC = this.TotalMontant + (this.TotalMontant * this.TVA)/100 + this.timbreFiscal
      }else if(this.type == 'bonLivraison' || this.type == 'devis'){
        this.totalNetTTC = this.TotalMontant + (this.TotalMontant * this.TVA)/100
      }else{
        this.toastr.warning("Veuillez choisir le type de la commande", 'Avertissement');
        this.TVA=0
      }
      
      //console.log('qqqqq',index)
    }
  }
  
  
  onTVABlur(tva : any){
    if(this.type == 'facture'){
      this.totalNetTTC = this.TotalMontant + (this.TotalMontant * tva)/100 + this.timbreFiscal
    }else if(this.type == 'bonLivraison' || this.type == 'devis'){
      this.totalNetTTC = this.TotalMontant + (this.TotalMontant * tva)/100
    }else{
      this.toastr.warning("Veuillez choisir le type de la commande", 'Avertissement');
      this.TVA=0
    }
  }


  getArticles() {
    this.articleService.getArticles().subscribe(
      (articles : any) => {
        this.tabArticles = articles
        // Supposons que les données des articles renvoyées par le service sont sous forme de tableau d'objets
        // Si le nom des articles est stocké dans la propriété 'nom' de chaque objet article, vous pouvez utiliser une boucle pour extraire les noms et les ajouter à nomArticles
        this.nomArticles = articles.map((article: { designation: any; })  => article.designation);
        this.refArticles = articles.map((article: { reference: any; }) => article.reference);
        this.refArticles.sort((a: string, b: string) => {
          return a.localeCompare(b, 'en', { numeric: true });
        });

        
      },
      (error) => {
        console.log('Erreur lors de la récupération des articles', error);
      }
    );
  }


  limiterLongueur(champ: any, longueurMax: number) {
  //  let valeurChamp: string = champ.value;
    //console.log('jkjkkjk',valeurChamp.length)
    //if (valeurChamp.length > longueurMax) {
      //console.log('fff')
      //champ.value = valeurChamp.slice(0, longueurMax);
   // }
  }
  
  reloadComponent() { 
      this.router.navigate(['/ajouter-commande']);
   
  }

  ajouterLigne() {
    this.k ++;
   // console.log('k',this.k)
    if(this.k>1)
    {
      //console.log('sssss',this.articles.length, this.articles[this.articles.length - 1])
      if(this.articles[this.articles.length - 1].reference !== "" &&
      this.articles[this.articles.length - 1].designation !== "" &&
      (this.articles[this.articles.length - 1].quantite !== 0 ) &&
      this.articles[this.articles.length - 1].prixVente !== 0 &&
      (this.articles[this.articles.length - 1].total !== 0  ) 
      ){
         this.articles.push({
        reference: '',
        designation: '',
        quantite: 0,
        prixVente: 0,
        total: 0
      });
  
   // Vérification de chaque ligne du tableau
  
   for (let i = 0; i < this.articles.length; i++) {
    const article = this.articles[i];
  
    // Vérification des attributs de l'article
    if (
       
      article.designation !== "" &&
      article.quantite !== 0 &&
      article.prixVente !== 0 &&
      article.total !== 0
    ) {
      // Les attributs de l'article sont valides
      // Faites quelque chose ici
      console.log("Ligne valide :", article);
      this.TabArticlesValide = true
    } else {
      // Les attributs de l'article sont vides ou égaux à 0
      // Faites quelque chose ici
      //console.log("Ligne invalide :", article);
      this.TabArticlesValide = false
      if(i !== this.articles.length-1){
        this.toastr.warning('La ligne ' + (i+1) + ' des détails de la commande est invalide', 'Avertissement');
  
      }
        }
  }
  
      }else{
        this.toastr.warning("La ligne des détails de la commande n'est pas encore valide", 'Avertissement');
  
      }
     
  
    }else{
      this.articles.push({
        reference: '',
        designation: '',
        quantite: 0,
        prixVente: 0,
        total: 0
      });
    }
    
   
  }

  supprimerLigne(ligneCommande: any) {
    const index = this.articles.indexOf(ligneCommande);
    if (index > -1) {
      this.articles.splice(index, 1);
    }
    
    for (let i = 0; i < this.articles.length; i++) {
      const article = this.articles[i];
    
      // Vérification des attributs de l'article
      if (
        
        article.designation !== "" &&
        article.quantite !== 0 &&
        article.prixVente !== 0 &&
        article.total !== 0
      ) {
        // Les attributs de l'article sont valides
        // Faites quelque chose ici
        console.log("Ligne valide :", article);
        this.TabArticlesValide = true
      } else {
        // Les attributs de l'article sont vides ou égaux à 0
        // Faites quelque chose ici
        console.log("Ligne invalide :", article);
        this.TabArticlesValide = false
        if(i !== this.articles.length-1){
          this.toastr.warning('La ligne ' + (i+1) + ' des détails de la commande est invalide', 'Avertissement');
    
        }
          }
    }
  }

  setClientData(client : any){ 
    this.clientService.getClientByName(client).subscribe(
      res =>{
        this.clientByName = res
        this.nom = this.clientByName.nom
        this.adresse = this.clientByName.adresse;
    this.telephone = this.clientByName.telephone;
    this.mf = this.clientByName.mf;
      }
    )
  }

  setData() {
    this.commandesService.getCommandeById(this.commandeId).subscribe((commande: Commande) => {
     // console.log('getcommandeById',commande);
      this.commande = commande;
       
      // Assigner les valeurs aux propriétés correspondantes
      this.client = commande.client.nom;
      this.adresse = commande.client.adresse;
      this.telephone = commande.client.telephone;
      this.mf = commande.client.mf;
      this.num = commande.num;
      this.type = commande.type;
      this.date = this.datePipe.transform(commande.date, 'yyyy-MM-dd');
      this.TotalMontant = commande.TotalMontant;
      this.TVA = commande.TVA;
      this.timbreFiscal = commande.timbreFiscal;
      this.totalNetTTC = commande.totalNetTTC;
      this.somme = commande.somme
      // Assigner les lignes de commande
      this.articles = commande.articles;
      if(this.type == 'facture'){
        this.chauffeur = commande.chauffeur
        this.matriculeCamion = commande.matriculeCamion
      }
    });
  }

  prec(){
    
    const initialState = {
      action: 'add'
    };
    this.modalRef = this.modalService.show(ModalConfirmComponent, { initialState });
    this.modalRef.content.modalClosed.subscribe((result: boolean) => {
      //console.log('result Modal closed:', result);
      if(result){
        this.router.navigateByUrl('/commandes')
      }else{
        this.modalRef.hide()
      }
    })
  }

  handleURLChange(url : any){
    const initialState = {
      action: 'add'
    };
    this.modalRef = this.modalService.show(ModalConfirmComponent, { initialState });
    this.modalRef.content.modalClosed.subscribe((result: boolean) => {
      //console.log('result Modal closed:', result);
      if(result){
       // this.router.navigateByUrl(url)
      }else{
        this.modalRef.hide()
      }
    })
  }
  
  modifier(commandeForm : any) {
    if(commandeForm.valid){
    const commande = {
      _id: this.commandeId,
      num: this.num,
      type: this.type,
      client: {
        nom: this.client,
        adresse: this.adresse,
        telephone: this.telephone,
        mf: this.mf
      },
      articles: this.articles,
      TotalMontant: this.TotalMontant,
      TVA: this.TVA,
      timbreFiscal: this.timbreFiscal,
      totalNetTTC: this.totalNetTTC,
      somme: this.somme,
      date: this.date,
      chauffeur : this.chauffeur,
      matriculeCamion : this.matriculeCamion
    };
  
    // Appeler le service pour modifier la commande
    this.commandesService.updateCommande(this.commandeId,commande).subscribe(
      response => {
       // console.log('Commande modifiée avec succès:', response);
        this.toastr.success('Commande modifiée avec succès', 'Succès');
        // Ajouter le code pour gérer la réponse du serveur ou effectuer des opérations supplémentaires
        this.router.navigateByUrl('/commandes')
        
      },
      error => {
        console.error('Erreur lors de la modification de la commande:', error);
        this.toastr.error('Erreur lors de la modification de la commande', 'Erreur');
        // Ajouter le code pour gérer l'erreur ou afficher un message à l'utilisateur
      }
    );}
    else{
      //console.log('formulaire non valide')
      this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
    }
  }
  


  valider(commandeForm : any) {

    //console.log('taaaaab',this.nom)

    if(this.TotalMontant == 0){
      this.TotalMontantValide = false
    }else{
      this.TotalMontantValide = true
    }
    if(this.TotalMontantValide == false){
      let totalSum = 0;
      for (let i = 0; i < this.articles.length; i++) {
        const article = this.articles[i];
      
          totalSum += article.total;
      }
 
      //console.log("Somme totale des 'total' :", totalSum);
      this.TotalMontant = totalSum


    }

    for (let i = 0; i < this.articles.length; i++) {
      const article = this.articles[i];
    
      // Vérification des attributs de l'article
      if (
         
        article.designation !== "" &&
        article.quantite !== 0 &&
        article.prixVente !== 0 &&
        article.total !== 0
      ) {
        // Les attributs de l'article sont valides
        // Faites quelque chose ici
        console.log("Ligne valide :", article);
        this.TabArticlesValide = true
      } else {
        // Les attributs de l'article sont vides ou égaux à 0
        // Faites quelque chose ici
        console.log("Ligne invalide :", article);
        this.TabArticlesValide = false
        if(i !== this.articles.length-1){
          this.toastr.warning('La ligne ' + (i+1) + ' des détails de la commande est invalide', 'Avertissement');
    
        }
          }
    }

    if(this.TVA == 0){
      this.toastr.warning('Veuillez selectionnez la valeur TVA', 'Avertissement');
    
    }
else{
   // console.log('validation', commandeForm.valid, "tabArticles", this.TabArticlesValide)
    if(commandeForm.valid && this.TabArticlesValide ){
      console.log('this.chauffeur',this.chauffeur,this.matriculeCamion)
    const commande = {
      num: this.num,
      type: this.type,
      client: {
        nom: this.nom,
        adresse: this.adresse,
        telephone: this.telephone,
        mf: this.mf
      },
      articles: this.articles,
      TotalMontant: this.TotalMontant,
      TVA: this.TVA,
      timbreFiscal: this.timbreFiscal,
      totalNetTTC: this.totalNetTTC,
      somme : this.somme,
      date: this.date,
      chauffeur : this.chauffeur,
      matriculeCamion : this.matriculeCamion
    }; 


    // Appeler le service pour ajouter la commande
    this.commandesService.addCommande(commande).subscribe(
      response => {
       // console.log('Commande ajoutée avec succès:', response);
        this.toastr.success('Commande ajoutée avec succès', 'Succès');
        // Ajouter le code pour gérer la réponse du serveur ou effectuer des opérations supplémentaires
        console.log('client', commande.client)
        this.addClient(commande.client)

        // Itérer sur chaque article
        for (const article of this.articles) {
          const designation = article.designation;
          const quantite = article.quantite;
          
          // Effectuer les opérations avec la quantité correspondante
          //console.log('Quantité de', designation, ':', quantite);
          
          // Mettre à jour la quantité en stock et la quantité vendue de l'article
          this.updateQuantite(article.designation, article.quantite);
        }

        this.router.navigateByUrl('/commandes')
      },
      error => {
        //console.error('Erreur lors de l\'ajout de la commande:', error);
        this.toastr.error('Erreur lors de l\'ajout de la commande', 'Erreur');
        // Ajouter le code pour gérer l'erreur ou afficher un message à l'utilisateur
      }
    );
  }else{
    //console.log('formulaire non valide')
    this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
  }
}
  
  }

 
  
  updateQuantite(designation: string, quantite: number) {
    // Appeler le service pour mettre à jour la quantité en stock et la quantité vendue de l'article
    this.articleService.updateQuantite(designation, quantite).subscribe(
      response => {
        console.log('Quantité mis à jour avec succès:', response);
        // Ajouter le code pour gérer la réponse du serveur ou effectuer des opérations supplémentaires
      },
      error => {
        console.error('Erreur lors de la mise à jour de la quantité:', error);
        // Ajouter le code pour gérer l'erreur ou afficher un message à l'utilisateur
      }
    );
  }


  addClient(client: any) {
    this.clientService.getClientByName(client.nom).subscribe(
      (existingClient : any) => {
        if (existingClient) {
          // Le client existe déjà, on effectue la mise à jour
          this.updateClient(existingClient._id, client);
        } 
      },
      err => {
        this.clientService.addClient(client).subscribe(
          res => {
            console.log('Client ajouté avec succès');
          },
          err => {
            console.log('Erreur lors de l\'ajout du client', err);
          } 
        );
      }
    );
  }
  
  updateClient(clientId: string, updatedClient: any) {
    this.clientService.updateClient(clientId, updatedClient).subscribe(
      res => {
        console.log('Client mis à jour avec succès');
      },
      err => {
       console.log('Erreur lors de la mise à jour du client', err);
      }
    );
  }
  

  getClients(){
    this.clientService.getClients().subscribe(
      res => {
        this.tabClients = res 
      
      }
    )
  }

  filterClients(value: string): void {
    //console.log('fdfff',value)
    this.suggestions = this.tabClients.filter((client: any) =>
      client.nom.toLowerCase().includes(value.toLowerCase()),
      
    );
  }
  

  getCommandes() {
    this.commandesService.getCommandes().subscribe(
      (res: any[]) => {
        const TabCommandes: any[] = res;
        //this.num = TabCommandes.length + 1;
  
        // Calculate the number of commands of each type
        const devisCount = TabCommandes.filter(commande => commande.type === 'devis').length;
        const bonLivraisonCount = TabCommandes.filter(commande => commande.type === 'bonLivraison').length;
        const factureCount = TabCommandes.filter(commande => commande.type === 'facture').length;
  
       // console.log('Total commands:', this.num);
       // console.log('Devis count:', devisCount);
       // console.log('BonLivraison count:', bonLivraisonCount);
        //console.log('Facture count:', factureCount);

        if(this.type == 'devis'){
          this.num = devisCount + 1
        }else if(this.type == 'bonLivraison'){
          this.num = bonLivraisonCount + 1
        }else if(this.type == 'facture'){
          this.num = factureCount + 1
        }else{
          this.toastr.warning("Veuillez choisir le type de la commande", 'Avertissement');
        }

      }
    );
  }
  
  
}

