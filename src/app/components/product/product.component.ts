import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
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
  dataSource: any;
  form: any = FormGroup;
  dataEnviar = [];
  dialogRef: any;
  habilitaBtnModificar = true;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog) {
    this.obtenerProductos();
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void { }

  async obtenerProductos(): Promise<any> {
    try {
      const res = await this.productService.listAllProducts();
      this.dataSource = new MatTableDataSource<ProductInterface>(res);
    } catch (error) {
      console.log(error);
    }
  }
  agregar(): void {
    this.llamarPopup('agregar');
  }
  editar(): void {
    this.llamarPopup('editar', this.dataEnviar);
  }
  seleccionarCampo(event: any, elemento: any): void {
    console.log(elemento);
    this.dataEnviar.push(elemento);
    this.habilitaBtnModificar = false;
  }

  llamarPopup(accionEnviar: string, data?: {}): void {
    this.dialogRef = this.dialog.open(AddProductComponent, {
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
    console.log(this.dialogRef);
    if (this.dialogRef) {
      this.obtenerProductos();
    }
  }
}



