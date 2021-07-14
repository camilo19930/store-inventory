import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInterface } from '../components/product/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:5000/';

  constructor(private httpClient: HttpClient) {}

  async createProduct(data: any): Promise<any> {
    return await this.httpClient.post(`${this.url}/add-product`, data).toPromise();
  }
  async listProduct(id: any): Promise<any> {
    return await this.httpClient.get(`${this.url}/list-product/${id}`).toPromise();
  }
  async listAllProducts(): Promise<any> {
    const res: any = await this.httpClient.get(`${this.url}/list-product`).toPromise();
    if (res.length > 0 ) {
      res.forEach(element => {
        element.select = false;
      });
    }
    return res;
  }
}
