import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['codigo', 'name', 'descripcion', 'symbol'];
  dataSource: any = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  agregar(): void {}
}



