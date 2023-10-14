import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'http://localhost:3000/article';

  constructor(private http: HttpClient) { }

  addArticle(article: any) {
    console.log('ArticleDataService', article);
    return this.http.post(`${this.apiUrl}/addArticle`, article);
  }

  getArticles() {
    return this.http.get(`${this.apiUrl}/getArticles`);
  }

  getArticleById(id: any) {
    return this.http.get(`${this.apiUrl}/getArticleById/${id}`);
  }

  getArticleByDesignation(designation: any)  {
    const designationURL = encodeURIComponent(designation);
    return this.http.get(`${this.apiUrl}/getArticleByDesignation/${designationURL}`);
  }

  getArticleByRef(ref: any) {
    const refURL = encodeURIComponent(ref);
    return this.http.get(`${this.apiUrl}/getArticleByRef/${refURL}`);
  }

  updateArticle(id: string, article: any) {
    return this.http.put(`${this.apiUrl}/updateArticle/${id}`, article);
  }

  updateQuantite(designation: string, quantite: number) {
    const body = {
      designation: designation,
      quantite: quantite
    };

    return this.http.put(`${this.apiUrl}/updateQuantite`, body);
  }

  deleteArticle(id: any) {
    return this.http.delete(`${this.apiUrl}/deleteArticle/${id}`);
  }
}
