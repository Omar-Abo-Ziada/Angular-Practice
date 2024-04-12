import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(): Observable<Iproduct[]> {

    return this._httpClient.get<Iproduct[]>(`${environment.baseUrl}/products`);

  }

  getProductById(id : string) : Observable<Iproduct>{
 
    return this._httpClient.get<Iproduct>(`${environment.baseUrl}/products/${id}`);

  }

  getProductsByCatId(catId : number) : Observable<Iproduct[]>{

    return this._httpClient.get<Iproduct[]>(`${environment.baseUrl}/products?catId=${catId}`)
  }

  addNewProduct(prod : Iproduct) :Observable<Iproduct>{

    return this._httpClient.post<Iproduct>(`${environment.baseUrl}/products` , JSON.stringify(prod));

  }

  deleteProduct(prodId : string ) : Observable<Iproduct>{

    console.log("entered API");
    
    return this._httpClient.delete<Iproduct>(`${environment.baseUrl}/products/${prodId}`);

  }

  editProduct(prodId: string, updatedProduct: Iproduct): Observable<any> {

    return this._httpClient.put(`${environment.baseUrl}/products/${prodId}`, updatedProduct);

  }

  uploadImage(formData: FormData) {
    return this._httpClient.post<any>('http://localhost:3000/upload', formData); // Adjust the URL as per your server configuration
  }

}

