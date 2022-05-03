import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../model/image';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getAll(productId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${API_URL}/images/${productId}`);
  }

  deleteAllImages(productId: number): Observable<Image> {
    return this.http.delete(`${API_URL}/images/${productId}`);
  }

  deleteImageById(id: number): Observable<Image> {
    return this.http.delete(`${API_URL}/images/delete/${id}`);
  }

  findById(id: number): Observable<Image> {
    return this.http.get<Image>(`${API_URL}/images/details/${id}`);
  }
}
