import { ArticlesCommande } from "./ArticlesCommande.model";
import { Article } from "./article.model";
import { Client } from "./client.model";

export interface Commande{
    _id : any,
    num : any,
    type : any,
    client : any,
    articles: any[],
    date : Date,
    TotalMontant : any,
    TVA : any,
    timbreFiscal : any,
    totalNetTTC : any
    chauffeur : any,
    matriculeCamion : any,
    somme : any
}