import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:3000/client';

  constructor(private http: HttpClient) { }

  addClient(client: any) {
    console.log('ClientDataService', client);
    return this.http.post(`${this.apiUrl}/addClient`, client);
  }

  getClients() {
    return this.http.get(`${this.apiUrl}/getClients`);
  }

  getClientById(id: any) {
    return this.http.get(`${this.apiUrl}/getClientById/${id}`);
  }

  getClientByName(nom : any){
    return this.http.get(`${this.apiUrl}/getClientByName/${nom}`);
  }

  updateClient(id: string, client: any) {
    return this.http.put(`${this.apiUrl}/updateClient/${id}`, client);
  }

  deleteClient(id: any) {
    return this.http.delete(`${this.apiUrl}/deleteClient/${id}`);
  }
}
