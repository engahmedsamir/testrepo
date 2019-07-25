import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url + "/api/categories");
  }

  post(category) {
    debugger
    return this.http.post(this.url + "/api/categories", category);
  }

  get(categoryId) {
    return this.http.get(this.url + "/api/categories/" + categoryId);
  }

  update(categoryId, category) {
    return this.http.put(this.url + "/api/categories/" + categoryId, category);
  }

  delete(categoryId) {
    return this.http.delete(this.url + "/api/categories/" + categoryId);
  }
}
