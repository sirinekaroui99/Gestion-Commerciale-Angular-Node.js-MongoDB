import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  myForm: any; 
  mailNotMatch = false
  passNotMatch = false
  showPassword: boolean = false;
  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) {}
 
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    let data = {
      email: this.email,
      password: this.password
    };


    this.authService.login(data)
    .then(response => {
      if (response && response.token) {
        this.router.navigate(['/']); // Redirection en cas de succès
        console.log('response', response);
      } else {
        // Affichez un message d'erreur ou effectuez d'autres actions en cas d'échec de l'authentification
        console.log('response', response.message);
        if(response.message == 'No admin found'){
          this.mailNotMatch = true
          this.passNotMatch = false
        }else if(response.message == 'Password does not match'){
          this.passNotMatch = true
          this.mailNotMatch = false
        }else{
           
        }
      }
    })
    .catch(error => {
      console.error(error);
      // Gérez les erreurs
    });
  
 
  }
  
}
