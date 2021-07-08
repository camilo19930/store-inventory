import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const materialComponents = [
  MatButtonModule
];

@NgModule({
  imports: [],
  exports: [materialComponents]
})
export class MaterialModule { }
