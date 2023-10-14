import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArticlesComponent } from './articles/articles.component';
import { NavSearchComponent } from './search/nav-search/nav-search.component';
import { NavSearchDateComponent } from './search/nav-search-date/nav-search-date.component';
import { NavbarTopComponent } from './nav/navbar-top/navbar-top.component';
import { BoiteAjoutArticleComponent } from './boitesDialogues/boite-ajout-article/boite-ajout-article.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientsComponent } from './clients/clients.component';
import { BoiteAjoutCommandeComponent } from './boitesDialogues/boite-ajout-commande/boite-ajout-commande.component';
import { AjoutCommandeComponent } from './commandes/ajout-commande/ajout-commande.component';
import { ListeCommandesComponent } from './commandes/liste-commandes/liste-commandes.component';
import { BoiteInfoComponent } from './boitesDialogues/boite-info/boite-info.component';
import { ImprimerCommandeComponent } from './commandes/imprimer-commande/imprimer-commande.component';
import { BonLivraisonComponent } from './imprimer/bon-livraison/bon-livraison.component';
import { FactureComponent } from './imprimer/facture/facture.component';
import { BoiteAjoutClientComponent } from './boitesDialogues/boite-ajout-client/boite-ajout-client.component';
import { ModalConfirmComponent } from './boitesDialogues/modal-confirm/modal-confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DatePipe } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticlesComponent,
    NavSearchComponent,
    NavSearchDateComponent,
    NavbarTopComponent,
    BoiteAjoutArticleComponent,
    ClientsComponent,
    BoiteAjoutCommandeComponent,
    AjoutCommandeComponent,
    ListeCommandesComponent,
    BoiteInfoComponent,
    ImprimerCommandeComponent,
    BonLivraisonComponent,
    FactureComponent,
    BoiteAjoutClientComponent,
    ModalConfirmComponent,
    DashboardComponent,
    ProfilComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    ModalModule.forRoot()
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]

})
export class AppModule { }
