import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductInterface } from './product-interface';

export interface PeriodicElement {
  name: string;
  codigo: number;
  descripcion: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { codigo: 1, name: 'Hydrogen', descripcion: 1.0079, symbol: 'H' },
  { codigo: 2, name: 'Helium', descripcion: 4.0026, symbol: 'He' },
  { codigo: 3, name: 'Lithium', descripcion: 6.941, symbol: 'Li' },
  { codigo: 4, name: 'Beryllium', descripcion: 9.0122, symbol: 'Be' },
  { codigo: 5, name: 'Boron', descripcion: 10.811, symbol: 'B' },
  { codigo: 6, name: 'Carbon', descripcion: 12.0107, symbol: 'C' },
  { codigo: 7, name: 'Nitrogen', descripcion: 14.0067, symbol: 'N' },
  { codigo: 8, name: 'Oxygen', descripcion: 15.9994, symbol: 'O' },
  { codigo: 9, name: 'Fluorine', descripcion: 18.9984, symbol: 'F' },
  { codigo: 10, name: 'Neon', descripcion: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'reference', 'cant', 'fech_update', 'select'];
  // dataSource: any = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  checked = false;
  indeterminate = false;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog) {
    this.obtenerProductos();
  }

  ngOnit(): void {
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  async obtenerProductos(): Promise<any> {
    try {
      const res = await this.productService.listAllProducts();
      console.log(res);
      // return res;
      this.dataSource = new MatTableDataSource<ProductInterface>(res);
    } catch (error) {
      console.log(error);
    }
  }
  async agregar(): Promise<any> {
    const dialogRef = this.dialog.open(AddProductComponent, {
      panelClass: 'custom-dialog-container',
      height: '200px',
      width: '50%',
      data: {
        data: {
          name: 'Camilo'
        }
      }
    });
  }
}



