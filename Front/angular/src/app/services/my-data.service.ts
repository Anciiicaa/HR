import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  private apiUrl = 'http://localhost:8000/api/'; // Prilagodite URL vašem Django API-ju

  constructor(private http: HttpClient) {}

  // Metoda za dohvat svih podataka
  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}sqlconnect/`);
  }

  // Metoda za dohvat jednog podatka po ID-u
  getOneData(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}sqlconnect/${id}/`);
  }
}
