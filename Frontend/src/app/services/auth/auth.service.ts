import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private apiUrl = 'http://localhost:3000';
  token : any
  constructor(private http: HttpClient,private router:Router) {} // Injection du service HttpClient

  async login(data: any): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/auth/login`, data).toPromise();
  
      console.log('response login', response);
  
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        this.isLoggedIn = true;
      }
  
      return response; // Renvoie la réponse complète
    } catch (error) {
      console.error(error);
      return null; // Renvoie null en cas d'erreur
    }
  }
  

  updateProfile(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/updateProfil`, formData);
  }

  logout(): void {
    this.http.post('http://localhost:3000/auth/logout', {}).subscribe(() => {
      // Effacez les données de l'utilisateur dans votre application
      // et redirigez l'utilisateur vers la page de connexion
      // par exemple :
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('Erreur lors de la déconnexion :', error);
      // Gérez l'erreur de déconnexion selon vos besoins
    });
  }

//  logout(): void {
    // Réinitialisez l'état de connexion lors de la déconnexion
    
  //  localStorage.removeItem('token');
     // Redirect to the root URL ('/')
  //this.router.navigate(['/']);

  //}

  isAuthenticated() {
    this.token =  localStorage.getItem('token')
    return this.token;
  }
}
