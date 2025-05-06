
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Colaborador {
  id?: number;
  nome: string;
  sexo: string;
  matricula: string;
  setor: string;
  cracha: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  private apiUrl = 'http://localhost:8080/api/colaboradores'; // ajuste se estiver diferente

  constructor(private http: HttpClient) {}

  cadastrar(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }
}