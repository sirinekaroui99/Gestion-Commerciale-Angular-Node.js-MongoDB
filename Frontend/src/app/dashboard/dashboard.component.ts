import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommandeService } from '../services/commandes/commandes.service';
import { ArticlesService } from '../services/articles/articles.service';
import { ClientsService } from '../services/clients/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCommandes!: number;
  valeurStock!: number;
  volumeStock!: number;
  totalClients!: number;
  backgroundColor: string[] = [];
  articles : any
  labels: string[] = [];
  data : any[] = [];
  //dataCommande : any[] = []
  dataFacture : any[] = []
  dataBonLivraison : any[] = [] 
  dataLabels = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  monthLabels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  selectedValue : any
  qtestock: any[] = [];

  constructor(private commandeService : CommandeService, 
    private articleService : ArticlesService,
    private clientService : ClientsService
    ) { }

  ngOnInit() {
    // Initialize statistical data (replace with your own data)
      
    
    this.nombreCommandes();
    this.nombreCommandesMois();
    this.nombreClients();
    this.volumeDuStock();
    this.valeurDuStock();

    
     
  }
  nombreCommandesMois() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const firstDayOfWeek = currentDay - currentDate.getDay(); // Premier jour de la semaine (dimanche)
  
    this.commandeService.getCommandes().subscribe(
      result => {
        const tabCommandes = result.filter(commande => {
          const dateCommande = new Date(commande.date);
          const year = dateCommande.getFullYear();
          const month = dateCommande.getMonth() + 1;
          const day = dateCommande.getDate();
  
          // Filtrer les commandes de l'année en cours
          return year === currentYear;
        });
  
        // Création du tableau dataCommandesMois
        const dataCommandesMois: number[] = new Array(12).fill(0); // Tableau de taille 12 initialisé avec des valeurs à zéro pour chaque mois
        const dataFactureMois: number[] = new Array(12).fill(0); // Tableau de taille 12 initialisé avec des valeurs à zéro pour le type "facture" pour chaque mois
        const dataBonLivraisonMois: number[] = new Array(12).fill(0); // Tableau de taille 12 initialisé avec des valeurs à zéro pour le type "bondelivraison" pour chaque mois
  
        tabCommandes.forEach(commande => {
          const dateCommande = new Date(commande.date);
          const monthIndex = dateCommande.getMonth(); // Indice du mois (0 = janvier, 1 = février, ..., 11 = décembre)
  
          dataCommandesMois[monthIndex]++;
  
          // Vérifier le type de la commande et incrémenter le tableau correspondant
          if (commande.type === 'facture') {
            dataFactureMois[monthIndex]++;
          } else if (commande.type === 'bonLivraison') {
            dataBonLivraisonMois[monthIndex]++;
          }
        });
  
        console.log('Data commandes par mois:', dataCommandesMois);
        console.log('Data facture par mois:', dataFactureMois);
        console.log('Data bon de livraison par mois:', dataBonLivraisonMois);
  
        
        this.createBarChartMois(this.monthLabels, dataCommandesMois, dataFactureMois, dataBonLivraisonMois);
      }
    );
  }
    
   
  nombreCommandes() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const firstDayOfWeek = currentDay - currentDate.getDay(); // Premier jour de la semaine (dimanche)
  
    this.commandeService.getCommandes().subscribe(
      result => {
        const tabCommandes = result.filter(commande => {
          const dateCommande = new Date(commande.date);
          const year = dateCommande.getFullYear();
          const month = dateCommande.getMonth() + 1;
          const day = dateCommande.getDate();
  
          // Filtrer les commandes de la semaine en cours
          return year === currentYear && month === currentMonth ;
        });
        this.totalCommandes = tabCommandes.length;
        console.log('cccc',tabCommandes)

        // Création du tableau dataCommandes
        const dataCommandes: number[] = new Array(7).fill(0); // Tableau de taille 7 initialisé avec des valeurs à zéro
        const dataFacture: number[] = new Array(7).fill(0); // Tableau de taille 7 initialisé avec des valeurs à zéro pour le type "facture"
        const dataBonLivraison: number[] = new Array(7).fill(0); // Tableau de taille 7 initialisé avec des valeurs à zéro pour le type "bondelivraison"
  
        tabCommandes.forEach(commande => {
          const dateCommande = new Date(commande.date);
          const dayOfWeek = dateCommande.getDay(); // Jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
  
          dataCommandes[dayOfWeek]++;
  
          // Vérifier le type de la commande et incrémenter le tableau correspondant
          if (commande.type === 'facture') {
            dataFacture[dayOfWeek]++;
          } else if (commande.type === 'bonLivraison') {
            dataBonLivraison[dayOfWeek]++;
          }
        });
  
        console.log('Data commandes:', dataCommandes);
        console.log('Data facture:', dataFacture);
        console.log('Data bon de livraison:', dataBonLivraison);
  
        this.createBarChart(this.dataLabels, dataCommandes, dataFacture, dataBonLivraison);
       }
    );
  
  }
  
  
  
  

  valeurDuStock(){
    let valeurStock = 0;

    this.articleService.getArticles().subscribe(
      result => {
       
        let articles : any = result
    // Parcourt chaque article de la liste
    for (const article of articles) {
      
      const valeurArticle = article.prixVente * article.quantiteEnStock; // Calcule la valeur de l'article
      valeurStock += valeurArticle; // Ajoute la valeur de l'article à la somme totale
    }
    this.valeurStock = valeurStock
   
    this.RandomColors();
      }
    )


    //return valeurStock; // Retourne la somme totale de la valeur du stock
  }

  volumeDuStock() {
    const distinctArticles = new Set();
  
    this.articleService.getArticles().subscribe(
      (result: any) => {
       this.articles = result;
  
        // Parcourt chaque article de la liste
        for (const article of this.articles) {
          distinctArticles.add(article.designation); // Ajoute le nom de l'article à l'ensemble des articles distincts
          this.labels.push(article.designation)
          this.data.push(article.quantiteVendu)
          this.qtestock.push(article.quantiteEnStock)
          //console.log('labels',this.labels,this.data)
        }
  
        //console.log('distinctArticles.size', distinctArticles.size); // Affiche la taille des articles distincts
        this.volumeStock = distinctArticles.size;
      },
      
    );
 // return this.volumeStock
    // La taille de distinctArticles ne peut pas être obtenue ici, car l'appel à subscribe() est asynchrone
  
    // Vous pouvez retourner distinctArticles.size directement ici si vous en avez besoin dans d'autres parties de votre code.
    // Sinon, vous pouvez ignorer le return car il n'est pas nécessaire dans ce cas.
  
    // return distinctArticles.size;
  }
  
  
  nombreClients(){
    this.clientService.getClients().subscribe(
      result => {
        let clients : any = result
         this.totalClients = clients.length
         //console.log('clients',this.totalClients)
      }
    );
  }

  createPieChartStock() {
    // Get the canvas element
    const pieChartCanvas = document.getElementById('pieChartStock') as HTMLCanvasElement;
  
    // Verify that the canvas element exists
    if (!pieChartCanvas) {
      console.error('Could not retrieve canvas element');
      return;
    }
  
    // Set the size of the canvas (optional)
    //pieChartCanvas.width = 100; // Set the desired width
    //pieChartCanvas.height = 100; // Set the desired height
  
    // Register the necessary components and plugins
    Chart.register(...registerables);
  
    // Define the chart data
    const data = {
      labels: this.labels,
      datasets: [{
        data: this.qtestock,
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    };
  
    // Create the pie chart
    new Chart(pieChartCanvas, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right', // Adjust the position as desired
            labels: {
              font: {
                size: 10 // Adjust the font size as desired
              }
            }
          },
          title: {  // Add the title here
            display: true,
            text: 'Quantité en stock pour chaque article', // Specify the title text
            font: {
              size: 14, // Adjust the font size as desired
              weight: 'bold' // Adjust the font weight as desired
            }
          }
        }
      }
    });

     
  }


  createPieChart() {
    // Get the canvas element
    const pieChartCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
  
    // Verify that the canvas element exists
    if (!pieChartCanvas) {
      console.error('Could not retrieve canvas element');
      return;
    }
  
    // Set the size of the canvas (optional)
    //pieChartCanvas.width = 100; // Set the desired width
    //pieChartCanvas.height = 100; // Set the desired height
  
    // Register the necessary components and plugins
    Chart.register(...registerables);
  
    // Define the chart data
    const data = {
      labels: this.labels,
      datasets: [{
        data: this.data,
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    };
  
    // Create the pie chart
    new Chart(pieChartCanvas, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right', // Adjust the position as desired
            labels: {
              font: {
                size: 10 // Adjust the font size as desired
              }
            }
          },
          title: {  // Add the title here
            display: true,
            text: 'Quantité vendue pour chaque article', // Specify the title text
            font: {
              size: 14, // Adjust the font size as desired
              weight: 'bold' // Adjust the font weight as desired
            }
          }
        }
      }
    });

     
  }
  
 

  createBarChart(labels: string[], dataCommande: number[], dataFacture : number[], dataBonLivraison : number[]) {
    // ...
      // Récupère le conteneur du diagramme à barres
    // Get the container for the bar chart
    const barChartCanvas = document.getElementById('linechartSemaine') as HTMLCanvasElement;

    // Vérifie que le conteneur existe
    // Verify that the container exists
    if (!barChartCanvas) {
      console.error('Could not retrieve chart container');
      return;
    }

     // Set the size of the canvas (optional)
     //barChartCanvas.width = 60; // Set the desired width
     barChartCanvas.height = 292; // Set the desired height

    // Récupère le contexte du canvas
    // Get the canvas context
    const barChartCtx = barChartCanvas.getContext('2d');

    // Vérifie que le contexte existe
    // Verify that the context exists
    if (!barChartCtx) {
      console.error('Could not retrieve canvas context');
      return;
    }

    // Enregistre les composants et plugins nécessaires
    // Register the necessary components and plugins
    Chart.register(...registerables);

    // Crée le diagramme à barres
    // Create the bar chart
    const barChart = new Chart(barChartCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de commandes',
            data: dataCommande,
            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Couleur de remplissage des barres
            borderColor: 'rgba(54, 162, 235, 1)', // Couleur de la bordure des barres
            borderWidth: 1 // Épaisseur de la bordure des barres
          },
          {
            label: 'Nombre des bons de livraisons',
            data: dataBonLivraison,
            borderColor: 'rgb(255, 165, 0)', // Couleur de la ligne 1
            borderWidth: 1 // Épaisseur de la ligne 1
          },
          {
            label: 'Nombre des factures',
            data: dataFacture,
            borderColor: 'rgb(60, 179, 113)', // Couleur de la ligne 2
            borderWidth: 1 // Épaisseur de la ligne 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombres de commandes par jours',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    }); 
   
  }


  createBarChartMois(labels: string[], dataCommande: number[], dataFacture : number[], dataBonLivraison : number[]) {
    // ...
      // Récupère le conteneur du diagramme à barres
    // Get the container for the bar chart
    const barChartCanvas = document.getElementById('linechartMois') as HTMLCanvasElement;

    // Vérifie que le conteneur existe
    // Verify that the container exists
    if (!barChartCanvas) {
      console.error('Could not retrieve chart container');
      return;
    }

     // Set the size of the canvas (optional)
     //barChartCanvas.width = 60; // Set the desired width
     barChartCanvas.height = 290; // Set the desired height

    // Récupère le contexte du canvas
    // Get the canvas context
    const barChartCtx = barChartCanvas.getContext('2d');

    // Vérifie que le contexte existe
    // Verify that the context exists
    if (!barChartCtx) {
      console.error('Could not retrieve canvas context');
      return;
    }

    // Enregistre les composants et plugins nécessaires
    // Register the necessary components and plugins
    Chart.register(...registerables);

    // Crée le diagramme à barres
    // Create the bar chart
    new Chart(barChartCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [ 
          {
            label: 'Nombre de commandes',
            data: dataCommande,
            backgroundColor: 'rgb(106, 90, 205)', // Couleur de remplissage des barres
            borderColor: 'rgb(106, 90, 205) ', // Couleur de la bordure des barres
            borderWidth: 1 // Épaisseur de la bordure des barres
          },
          {
            label: 'Nombre des bons de livraisons',
            data: dataBonLivraison,
            borderColor: 'rgb(238, 130, 238)', // Couleur de la ligne 1
            borderWidth: 1 // Épaisseur de la ligne 1
          }, 
          {
            label: 'Nombre des factures',
            data: dataFacture,
            borderColor: 'rgb(60, 179, 113)', // Couleur de la ligne 2
            borderWidth: 1 // Épaisseur de la ligne 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombres de commandes par mois',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    });
   
  }


  RandomColors() {
    const backgroundColor: string[] = [];
    //console.log('volume stock', this.volumeStock);
  
    const hueStep = 360 / this.volumeStock; // Étape de changement de teinte pour obtenir des couleurs distinctes
    
    for (let i = 0; i < this.volumeStock; i++) {
      const hue = i * hueStep;
      const color = `hsl(${hue}, 100%, 50%)`; // Utilise le modèle de couleur HSL avec teinte, saturation et luminosité fixes
      backgroundColor.push(color);
    }
  
    this.backgroundColor = backgroundColor;
    //console.log('random colors', this.backgroundColor);
    this.createPieChart();
    this.createPieChartStock()
  }
  
   

  
}
