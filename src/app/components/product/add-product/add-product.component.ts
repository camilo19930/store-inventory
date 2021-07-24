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
  id = 0;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.form = this.construirFormulario();
    this.fech_update.setValue('2021/07/19');
  }
  ngOnInit(): void {
    if (this.data.data.accion === 'editar') {
      this.llenarCampos(this.data.data.registros[0]);
    }
  }

  private construirFormulario(): any {
    return this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      reference: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      cant: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      fech_update: new FormControl(null, Validators.required),
    });
  }

  get name(): any { return this.form.get('name'); }
  get description(): any { return this.form.get('description'); }
  get reference(): any { return this.form.get('reference'); }
  get cant(): any { return this.form.get('cant'); }
  get fech_update(): any { return this.form.get('fech_update'); }

  async guardar(): Promise<any> {
    let bandera = true;
    for (const el in this.form.controls) {
      if (this.form.controls[el].errors) {
        bandera = false;
      }
    }
    if (this.form.status === 'VALID') {
      const data = {
        name: this.name.value,
        description: this.description.value,
        reference: +this.reference.value,
        cant: +this.cant.value,
        fech_update: '2021/07/19'
      };
      try {
        if (this.data.data.accion === 'editar') {
          this.editar(data);
        } else {
          this.guardarRegistro(data);
        }
        this.dialogRef.close('true');
      } catch (error) {
        this.alertError();
      }
    } else {
      this.alertWarning();
    }
  }
  async editar(data): Promise<any> {
    try {
      const res = await this.productService.editProduct(data, this.id);
      await this.alertExito('El registro ha sido actualizado');
    } catch (error) {
      this.alertError();
    }
  }
  async guardarRegistro(data): Promise<any> {
    try {
      const res = await this.productService.createProduct(data);
      await this.alertExito('El registro ha sido creado');
    } catch (error) {
      this.alertError();
    }
  }
  llenarCampos(datos): void {
    this.name.setValue(datos.name);
    this.description.setValue(datos.description);
    this.reference.setValue(datos.reference);
    this.cant.setValue(datos.cant);
    this.fech_update.setValue(datos.fech_update);
    this.id = +datos.id;
  }


  alertExito(message: string): void {
    Swal.fire({
      title: 'Exitoso!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
  alertError(): void {
    Swal.fire({
      title: 'Falló!',
      text: 'El registro no se ha podido crear',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  alertWarning(): void {
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
