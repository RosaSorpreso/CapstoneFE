import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { iContinent } from '../Models/i-continent';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {

  private continentSubject = new BehaviorSubject<iContinent[]>([])
  continent$ = this.continentSubject.asObservable()

  constructor(private http: HttpClient) {
    this.getAllContinents().subscribe(
      continents => {
        this.continentSubject.next(continents)
      }
    )
  }

  getAllContinents(): Observable<iContinent[]>{
    return this.http.get<iContinent[]>(environment.continentsUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching continents:', error);
        throw error;
      })
    );
  }
}
