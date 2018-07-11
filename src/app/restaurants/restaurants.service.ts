import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { Http } from '@angular/http';
import { MEAT_API } from '../app.api';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorHandler } from '../app.error-handler';

@Injectable()
export class RestaurantsService {
  constructor(private http: Http) {}

  restaurants(): Observable<Restaurant[]> {
    return this.http
      .get(`${MEAT_API}/restaurants`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }
  restaurantsById(id: string): Observable<Restaurant> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}`)
      .map(reponse => reponse.json())
      .catch(ErrorHandler.handleError);
  }
}
