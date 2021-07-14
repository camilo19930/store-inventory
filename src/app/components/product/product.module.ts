import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { GenericModule } from 'src/app/modules/generic/generic.module';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [ProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    GenericModule
  ], entryComponents: [
    AddProductComponent
  ]
})
export class ProductModule { }
