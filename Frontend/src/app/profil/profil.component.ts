import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  email!: string;
  admin!: {
    password: string;
    nouveauPassword: string;
  };
  mdpsIncorrect = false
  errorMessage = '' ;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  showPassword : any
  showNewPassword : any
  constructor(private authservice: AuthService, private toastr: ToastrService) {
    this.email = '';
    this.admin = {
      password: '',
      nouveauPassword: ''
    }; 
  }

  ngOnInit() {
   this.getEmail()
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  
  getEmail(): string {
    const token = localStorage.getItem('token');
    const email = this.getEmailFromToken(token);
    return email;
  }

  getEmailFromToken(token: any): string {
    const decodedToken: any = jwt_decode(token);
    this.email = decodedToken.email;
    return this.email;
  }

 

  submitForm(profileForm : any) { 
    if(profileForm.valid){
      const formData = {
      email: this.email,
      password: this.admin.password,
      nouveauPassword: this.admin.nouveauPassword
    };
console.log('form',formData)
    this.authservice.updateProfile(formData)
      .subscribe(
        response => {
          // Gérer la réponse du serveur en cas de succès
          console.log('Profil mis à jour avec succès', response);
          this.toastr.success('Profil mis à jour avec succès', 'Succès');
          this.admin.password = ''
          this.admin.nouveauPassword = ''
        },
        error => {
          // Gérer les erreurs de mise à jour du profil 
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.error.message;
            console.log(this.errorMessage);
            this.mdpsIncorrect = true
                     }
        }
      );
  
    }else{
      console.log('formulaire non valide')
      this.toastr.error('Le formulaire n\'est pas valide.', 'Erreur');
    }
    }
}
