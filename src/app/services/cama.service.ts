import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamaService {

  private apiUrl = 'http://localhost:8080/api/camas'; // URL da sua API Spring

  constructor(private http: HttpClient) { }

  getCamas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
