import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {

  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  delete: boolean = false;
  quitupdate: boolean = false;
  quitadd: boolean = false;
  action : any
  constructor(private modalService: BsModalService) {}

  ngOnInit(){
    if(this.action == 'delete'){
      this.delete = true
    }else if(this.action == 'update'){
      this.quitupdate = true
    }else if(this.action =='add' ){
      this.quitadd = true
    }
  }


  confirm() {
    
         this.modalService.hide();
    this.modalClosed.emit(true);
    
 
  }
  
  cancel() {
    
      this.modalClosed.emit(false); 
      if(this.delete){
        this.modalClosed.emit(false)
        this.modalService.hide()
      }
    
  }
}
