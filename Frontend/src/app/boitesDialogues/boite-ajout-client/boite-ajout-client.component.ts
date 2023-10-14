import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients/client.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boite-ajout-client',
  templateUrl: './boite-ajout-client.component.html',
  styleUrls: ['./boite-ajout-client.component.css']
})
export class BoiteAjoutClientComponent {
  @ViewChild('addForm', { static: false }) addForm!: NgForm;
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  bsModalRef!: BsModalRef;
  client!: Client;
  nom!: string;
  adresse!: string;
  telephone!: string;
  mf!: string;
  clientId: any;
  TabClients: Client[] = [];
  public clients!: Client[];
  modalRef!: BsModalRef;
  isModal: any;

  constructor(private toastr: ToastrService,
    private modalService: BsModalService,
    private clientsService: ClientsService
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
      //console.log('result Modal closed:', result);
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

  ngOnInit() {
    
    if (this.clientId) {
      this.setData();
    }
    this.getClients();
  }

  setData() {
    this.clientsService.getClientById(this.clientId).subscribe((client: any) => {
      this.nom = client.nom;
      this.adresse = client.adresse;
      this.telephone = client.telephone;
      this.mf = client.mf;
    });
  }

  onUpdateClient(clientForm : any): void {
    if(clientForm.valid){
    this.client = {
      _id: this.clientId,
      nom: this.nom,
      adresse: this.adresse,
      telephone: this.telephone,
      mf: this.mf
    };

    this.clientsService.updateClient(this.client._id, this.client).subscribe(
      (response) => {
       
        this.toastr.success('Client modifié avec succès', 'Succès');
        this.getClients();
        this.modalClosed.emit();
        this.modalService.hide();

      },
      (error: HttpErrorResponse) => {
       // alert(error.message);
       this.toastr.error('Erreur lors de la modification du client', 'Erreur');
       
      }
    );
  }else{
   // console.log('formulaire non valide')
    this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
  }
  }

  onAddClient( clientForm : any): void {
    if(clientForm.valid){
      
    let client: any = {
      nom: this.nom,
      adresse: this.adresse,
      telephone: this.telephone,
      mf: this.mf
    };

    this.clientsService.addClient(client).subscribe(
      (response) => {
       // console.log(response);
        this.toastr.success('Client ajouté avec succès', 'Succès');
        this.getClients();
        this.modalClosed.emit();
        this.modalService.hide();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.toastr.error('Erreur lors de l\'ajout du client', 'Erreur');
       
      }
    );}
    else{
    //  console.log('formulaire non valide')
      this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
    }
  }

  getClients() {
    this.clientsService.getClients().subscribe(
      (res: any) => {
        this.TabClients = res;
        //console.log('res getClients', this.TabClients);
      },
      (err) => {
        console.log('erreur getClients');
      }
    );
  }
}
