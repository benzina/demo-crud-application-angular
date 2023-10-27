import { Product } from './../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "http://localhost:8088/products";

  constructor(private http: HttpClient) { }

  public searchProducts(keyword: string, page: number, size: number) {
    return this.http.get(`${this.url}?name_like=${keyword}&_page=${page}&_limit=${size}`, { observe: 'response' });
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.url}/${product.id}`,
      { checked: !product.checked })
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(`${this.url}/${product.id}`)
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  public getProductById(productId: number): Observable<Product>{
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }
}
