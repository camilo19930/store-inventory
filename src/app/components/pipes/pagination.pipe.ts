import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../product/product-interface';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(products: ProductInterface[], ...args: unknown[]): ProductInterface[] {
    return [];
  }

}
