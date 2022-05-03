import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {CategoryEditComponent} from '../category/category-edit/category-edit.component';
import {Category} from '../model/category';
import {getBasePaths} from '@angular/compiler-cli/ngcc/src/entry_point_finder/utils';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/categories/${id}`);
  }

  save(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API_URL}/categories`, category);
  }

  edit(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${API_URL}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${API_URL}/categories/${id}`);
  }
}
