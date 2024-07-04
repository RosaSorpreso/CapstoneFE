import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { iTravelComplete } from '../Models/i-travel-complete';
import { iTravelRequest } from '../Models/i-travel-request';
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

  getTravelById(id: number): Observable<iTravelComplete>{
    return this.http.get<iTravelComplete>(`${environment.travelsUrl}/${id}`)
  }

  getTravelsBy(type: string, id: number): Observable<iTravelComplete[]>{
    return this.http.get<iTravelComplete[]>(`${environment.travelsUrl}/${type}/${id}`)
  }

  getTravelsByBoolean(type: string, boolean: boolean): Observable<iTravelComplete[]>{
    return this.http.get<iTravelComplete[]>(`${environment.travelsUrl}/${type}/${boolean}`)
  }

  addTravel(travel: iTravelRequest, files: File[]): Observable<iTravelComplete> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('file', file, file.name);
    });
    formData.append('travel', JSON.stringify(travel));
    return this.http.post<iTravelComplete>(`${environment.travelsUrl}/create`, formData)
      .pipe(
        tap(newTravel => {
          const currentTravels = this.travelSubject.getValue();
          this.travelSubject.next([...currentTravels, newTravel]);
        }),
        catchError(error => {
          console.error('Error adding travel:', error);
          throw error;
        })
      );
  }

  updateTravel(id: number, travel: iTravelRequest): Observable<iTravelComplete> {
    return this.http.put<iTravelComplete>(`${environment.travelsUrl}/update/${id}`, travel)
      .pipe(
        tap(updatedTravel => {
          const currentTravels = this.travelSubject.getValue();
          const index = currentTravels.findIndex(t => t.id === id);
          if (index !== -1) {
            currentTravels[index] = updatedTravel;
          }
          this.travelSubject.next([...currentTravels]);
        }),
        catchError(error => {
          console.error('Error updating travel:', error);
          throw error;
        })
      );
  }


  deleteTravel(id: number): Observable<iTravelComplete[]> {
    return this.http.delete(`${environment.travelsUrl}/delete/${id}`, { responseType: 'text' })
      .pipe(
        tap(() => {
          const currentTravels = this.travelSubject.getValue();
          const updatedTravels = currentTravels.filter(t => t.id !== id);
          this.travelSubject.next(updatedTravels);
        }),
        map(() => this.travelSubject.getValue()),
        catchError(error => {
          console.error('Error deleting travel:', error);
          throw error;
        })
      );
  }
}
