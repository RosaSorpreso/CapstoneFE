import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { iTravelComplete } from '../Models/i-travel-complete';
import { iTravelLight } from '../Models/i-travel-light';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private travelSubject = new BehaviorSubject<iTravelComplete[]>([])
  travels$ = this.travelSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAllTravels().subscribe(
      travels => {
        this.travelSubject.next(travels)
      }
    )
  }

  getAllTravels(): Observable<iTravelComplete[]>{
    return this.http.get<iTravelComplete[]>(environment.travelsUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching travels:', error);
        throw error;
      })
    )
  }

  getTravelsBy(type: string, id: number): Observable<iTravelComplete[]>{
    return this.http.get<iTravelComplete[]>(`${environment.travelsUrl}/${type}/${id}`)
  }

  getTravelsByBoolean(type: string, boolean: boolean): Observable<iTravelComplete[]>{
    return this.http.get<iTravelComplete[]>(`${environment.travelsUrl}/${type}/${boolean}`)
  }

  deleteTravel(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.travelsUrl}/delete/${id}`)
    .pipe(
      tap(() => {
        const currentTravels = this.travelSubject.getValue()
        const updatedTravels = currentTravels.filter(t => t.id != id)
        this.travelSubject.next(updatedTravels)
      }),
      catchError(error => {
        console.error('Error deleting travel:', error);
        throw error;
      })
    )
  }
}
