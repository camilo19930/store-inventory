import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


const materialComponents = [
  MatButtonModule,
  MatInputModule
];

@NgModule({
  imports: [],
  exports: [materialComponents]
})
export class MaterialModule { }
