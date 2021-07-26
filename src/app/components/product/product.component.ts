import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductInterface } from './product-interface';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'reference', 'cant', 'fech_update', 'select'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  form: any = FormGroup;
  dataEnviar: any = [];
  dialogRef: any;
  habilitaBtnModificar = true;
  numeroResgistros = 5;
  dataProduct: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog) {
    this.obtenerProductos();
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async actualizar(): Promise<any> {
    try {
      const res = await this.productService.listAllProducts();
      this.dataSource = res;
    } catch (error) {
      this.alertError('Ha ocurrido un error a la hora de obtener los productos');
    }
  }

  async obtenerProductos(): Promise<any> {
    try {
      const res = await this.productService.listAllProducts();
      this.dataProduct = res;
      // this.pagination(0);
      this.dataSource = new MatTableDataSource<ProductInterface>(res);
    } catch (error) {
      this.alertError('Ha ocurrido un error a la hora de obtener los productos');
    }
  }
  agregar(): void {
    this.llamarPopup('agregar');
  }
  editar(): void {
    this.llamarPopup('editar', this.dataEnviar);
  }
  seleccionarCampo(event: any, elemento: any): void {
    if (this.dataEnviar.length === 0) {
      this.dataEnviar.push(elemento);
      this.habilitaBtnModificar = false;
    } else {
      const BUSQUEDA = this.dataEnviar.find(option => option.id === elemento.id);
      if (BUSQUEDA !== undefined) {
        this.dataEnviar.splice(BUSQUEDA, 1);
        this.habilitaBtnModificar = true;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No puede seleccionar más de un resgistro',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }
  async llamarPopup(accionEnviar: string, data?: {}): Promise<any> {
    this.dialogRef = await this.dialog.open(AddProductComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      width: 'auto',
      data: {
        data: {
          accion: accionEnviar,
          registros: data === undefined ? null : data
        }
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result.respuesta === true) {
        this.actualizar();
        this.habilitaBtnModificar = true;
        this.dataEnviar = [];
      }
    });
  }
  async eliminar(): Promise<any> {
    await this.productService.deleteProduct(this.dataEnviar[0].id).then(res => {
      if (res.message !== undefined) {
        this.alertExito(res.message);
        this.habilitaBtnModificar = true;
        this.dataEnviar = [];
        this.actualizar();
      } else {
        this.alertError('No se ha podido eliminar el registro');
      }
    }).catch(err => {
      this.alertError(`No se ha podido eliminar el registro`);
    });

  }
  alertExito(message: string): void {
    Swal.fire({
      title: 'Exitoso!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
  alertError(message: string): void {
    Swal.fire({
      title: 'Falló!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  pagination(inicio): void {
    const registrosPag = [];
    for (let elem = inicio; elem < this.numeroResgistros; elem++) {
      registrosPag.push(this.dataProduct[elem]);
    }
    this.dataSource = new MatTableDataSource<ProductInterface>(registrosPag);
  }
}
