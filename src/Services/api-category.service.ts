import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  constructor(private _HttpClient :HttpClient) { }

  getAllCategories() : Observable<Icategory[]>{

    return this._HttpClient.get<Icategory[]>(`${environment.baseUrl}/categories`);

  }

  
  getCategoryById(catId : number) : Observable<Icategory>{

    return this._HttpClient.get<Icategory>(`${environment.baseUrl}/categories/${catId}`);

  }

  addNewCategory(cat : Icategory) : Observable<Icategory>{

  return this._HttpClient.post<Icategory>(`${environment.baseUrl}/categories` , JSON.stringify(cat));

  }

  
}
