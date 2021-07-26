import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInterface } from '../components/product/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) { }

  async createProduct(data: any): Promise<any> {
    return await this.httpClient.post(`${this.url}/add-product`, data).toPromise();
  }
  async editProduct(data: any, id): Promise<any> {
    return await this.httpClient.put(`${this.url}/product/${id}`, data).toPromise();
  }
  async listProduct(id: any): Promise<any> {
    return await this.httpClient.get(`${this.url}/list-product/${id}`).toPromise();
  }
  async deleteProduct(id: any): Promise<any> {
    return await this.httpClient.delete(`${this.url}/delete-product/${id}`).toPromise();
  }
  async listAllProducts(): Promise<any> {
    const res: any = await this.httpClient.get(`${this.url}/list-product`).toPromise();
    // const res: any = [
    //   {
    //     cant: 24,
    //     description: 'jeans levis',
    //     fech_update: '2021-07-19',
    //     id: 1,
    //     name: 'jeans',
    //     reference: 6
    //   },
    //   {
    //     cant: 12,
    //     description: 'jeans levis con rotos',
    //     fech_update: '2021-07-19',
    //     id: 2,
    //     name: 'jeans negros',
    //     reference: 123
    //   },
    //   {
    //     cant: 10,
    //     description: 'colores variados',
    //     fech_update: '2021-07-19',
    //     id: 3,
    //     name: 'Camisa manga corta',
    //     reference: 11
    //   },
    //   {
    //     cant: 12,
    //     description: 'color rosado',
    //     fech_update: '2021-07-19',
    //     id: 4,
    //     name: 'blusa manga corta',
    //     reference: 101
    //   },
    //   {
    //     cant: 12,
    //     description: 'para hombre color cafe',
    //     fech_update: '2021-07-19',
    //     id: 5,
    //     name: 'pantalon escolar',
    //     reference: 62
    //   },
    //   {
    //     cant: 50,
    //     description: 'Marca Nike, Adiddas y Puma',
    //     fech_update: '2021-07-19',
    //     id: 10,
    //     name: 'Medias cortas',
    //     reference: 23
    //   },
    //   {
    //     cant: 15,
    //     description: 'Pantaloneta para ni\u00f1os tallas 8, 10 y12',
    //     fech_update: '2021-07-19',
    //     id: 11,
    //     name: 'pantaloneta ni\u00f1os',
    //     reference: 13
    //   },
    //   {
    //     cant: 24,
    //     description: 'jeans levis',
    //     fech_update: '2021-07-19',
    //     id: 1,
    //     name: 'jeans',
    //     reference: 6
    //   },
    //   {
    //     cant: 12,
    //     description: 'jeans levis con rotos',
    //     fech_update: '2021-07-19',
    //     id: 2,
    //     name: 'jeans negros',
    //     reference: 123
    //   },
    //   {
    //     cant: 10,
    //     description: 'colores variados',
    //     fech_update: '2021-07-19',
    //     id: 3,
    //     name: 'Camisa manga corta',
    //     reference: 11
    //   },
    //   {
    //     cant: 12,
    //     description: 'color rosado',
    //     fech_update: '2021-07-19',
    //     id: 4,
    //     name: 'blusa manga corta',
    //     reference: 101
    //   },
    //   {
    //     cant: 12,
    //     description: 'para hombre color cafe',
    //     fech_update: '2021-07-19',
    //     id: 5,
    //     name: 'pantalon escolar',
    //     reference: 62
    //   },
    //   {
    //     cant: 50,
    //     description: 'Marca Nike, Adiddas y Puma',
    //     fech_update: '2021-07-19',
    //     id: 10,
    //     name: 'Medias cortas',
    //     reference: 23
    //   },
    //   {
    //     cant: 15,
    //     description: 'Pantaloneta para ni\u00f1os tallas 8, 10 y12',
    //     fech_update: '2021-07-19',
    //     id: 11,
    //     name: 'pantaloneta ni\u00f1os',
    //     reference: 13
    //   }
    // ];

    if (res.length > 0) {
      res.forEach((element, index) => {
        element.select = false;
        element.idPaginator = index;
      });
    }
    return res;
  }
}
