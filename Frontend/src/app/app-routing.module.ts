import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ArticlesComponent } from './articles/articles.component';
import { ClientsComponent } from './clients/clients.component';
import { ListeCommandesComponent } from './commandes/liste-commandes/liste-commandes.component';
import { AjoutCommandeComponent } from './commandes/ajout-commande/ajout-commande.component';
import { ImprimerCommandeComponent } from './commandes/imprimer-commande/imprimer-commande.component';
import { BonLivraisonComponent } from './imprimer/bon-livraison/bon-livraison.component';
import { FactureComponent } from './imprimer/facture/facture.component';
import { ModalConfirmComponent } from './boitesDialogues/modal-confirm/modal-confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  
  { path: '', component: DashboardComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'commandes', component: ListeCommandesComponent },
  { path: 'ajouter-commande', component: AjoutCommandeComponent },
  { path: 'imprimer-commande', component: ImprimerCommandeComponent },
  { path: 'imprimer-bon-livraison', component: BonLivraisonComponent },
  { path: 'imprimer-facture', component: FactureComponent },
  { path: 'confirm', component:ModalConfirmComponent }
  ,
  { path: 'clients', component: ClientsComponent },
  { path: 'profil', component: ProfilComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
