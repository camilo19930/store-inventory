import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


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
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.form = this.construirFormulario();
  }
  ngOnInit(): void {
    console.log(this.data);
    if (this.data.data.accion === 'editar') {
      this.llenarCampos(this.data.data.registros[0]);
    }
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

  async guardar(): Promise<any> {
    if (!this.form.invalid) {
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
        await this.tinyAlert();
        this.dialogRef.close(true);
      } catch (error) {
        this.tinyAlertError();
        console.log(error);
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe llenar los campos obligatorios',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false,
        width: 300
      });
    }
  }

  llenarCampos(datos): void{
    this.name.setValue(datos.name);
    this.description.setValue(datos.description);
    this.reference.setValue(datos.reference);
    this.cant.setValue(datos.cant);
    this.fech_update.setValue(datos.fech_update);
  }


  tinyAlert(): void {
    Swal.fire({
      title: 'Exitoso!',
      text: 'El registro ha sido creado',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
  tinyAlertError(): void {
    Swal.fire({
      title: 'Exitoso!',
      text: 'El registro ha sido creado',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
