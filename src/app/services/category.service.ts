import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { iCategory } from '../Models/i-category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categorySubject = new BehaviorSubject<iCategory[]>([])
  category$ = this.categorySubject.asObservable()

  constructor(private http: HttpClient) {
    this.getAllCategories().subscribe(
      categories => {
        this.categorySubject.next(categories)
      }
    )
  }

  getAllCategories(): Observable<iCategory[]>{
    return this.http.get<iCategory[]>(environment.categoriesUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        throw error;
      })
    );
  }

  createCategory(category: Partial<iCategory>): Observable<iCategory> {
    return this.http.post<iCategory>(environment.categoriesUrl, category)
    .pipe(
      catchError(error => {
        console.error('Error create category:', error);
        throw error;
      })
    );
  }
}
