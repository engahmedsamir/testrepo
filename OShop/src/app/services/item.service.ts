import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get(this.url + "/api/items");
  }

  post(item) {
    debugger
    return this.http.post(this.url + "/api/items", item);
  }

  get(itemId) {
    return this.http.get(this.url + "/api/items/" + itemId);
  }

  update(itemId, item) {
    return this.http.put(this.url + "/api/items/" + itemId, item);
  }

  delete(itemId) {
    return this.http.delete(this.url + "/api/items/" + itemId);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }
}
