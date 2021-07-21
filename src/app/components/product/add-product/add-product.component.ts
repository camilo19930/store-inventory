import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form: any = FormGroup;
  // data: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.form = this.construirFormulario();
  }
  ngOnInit(): void {
    console.log(this.data);
  }

  private construirFormulario(): any {
    return this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      reference: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      cant: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      fech_update: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
    });
  }

  get name(): any { return this.form.get('name'); }
  get description(): any { return this.form.get('description'); }
  get reference(): any { return this.form.get('reference'); }
  get cant(): any { return this.form.get('cant'); }
  get fech_update(): any { return this.form.get('fech_update'); }

  async Guardar(): Promise<any> {
    const data = {
      name: this.name.value,
      description: this.description.value,
      reference: +this.reference.value,
      cant: +this.cant.value,
      fech_update: '2021/07/19'
    };
    try {
      const res = await this.productService.createProduct(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  tinyAlert(): void{
    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // });
  }
}
