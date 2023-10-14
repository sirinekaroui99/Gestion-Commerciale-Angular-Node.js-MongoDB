import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/commandes';

  constructor(private http: HttpClient) { }

  addCommande(commande: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addCommande`, commande);
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/getCommandes`);
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/getCommandeById/${id}`);
  }

  updateCommande(id: number, commande: Commande): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateCommande/${id}`, commande);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCommande/${id}`);
  }
}
