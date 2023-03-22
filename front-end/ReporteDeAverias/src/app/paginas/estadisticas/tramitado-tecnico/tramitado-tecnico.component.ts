import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReporteTecnicoPorFecha } from 'src/app/core/modelos/reporteTecnico.model';
import { ReporteTecnicoService } from 'src/app/core/servicios/catalogos/reporteTecnico.service';
import * as internal from 'stream';
import * as XLSX from 'xlsx';

let dataTecnicosMes: ReporteTecnicoPorFecha[];
let dataTecnicosAnio: ReporteTecnicoPorFecha[];

@Component({
  selector: 'app-tramitado-tecnico',
  templateUrl: './tramitado-tecnico.component.html',
  styleUrls: ['./tramitado-tecnico.component.css']
})
export class TramitadoTecnicoComponent implements OnInit {

  public ocultarTablas: boolean;
  public buscarAnio: string;
  public buscarMes: string;
  public fechaInicio: string;
  public fechaFinal: string;

  dataSource = new MatTableDataSource<ReporteTecnicoPorFecha>([]);
  displayedColumns: string[] = ['annio', 'mes', 'tecnico', 'cantidad'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource2 = new MatTableDataSource<ReporteTecnicoPorFecha>([]);
  displayedColumns2: string[] = ['annio', 'tecnico', 'cantidad'];
  @ViewChild(MatPaginator, { static: true }) paginator2!: MatPaginator;

  constructor(private reporteTecnicoService: ReporteTecnicoService) {

    this.buscarAnio = '';
    this.buscarMes = '';
    this.fechaInicio = '';
    this.fechaFinal = '';
    dataTecnicosMes = [];
    dataTecnicosAnio = [];
    this.ocultarTablas = false;
  }

  ngOnInit(): void {

  }

  rango = new FormGroup({
    inicio: new FormControl<Date | null>(null),
    fin: new FormControl<Date | null>(null),
  });

  getBuscarPorFechas() {
    var mesInicio: any = (this.rango.controls.inicio.value?.getMonth());
    var mesFinal: any = (this.rango.controls.fin.value?.getMonth());
    this.fechaInicio = this.rango.controls.inicio.value?.getDate() + '-' + (mesInicio + 1) + '-' + this.rango.controls.inicio.value?.getFullYear();
    this.fechaFinal = this.rango.controls.fin.value?.getDate() + '-' + (mesFinal + 1) + '-' + this.rango.controls.fin.value?.getFullYear();
    if (mesInicio != null && mesFinal != null) {
      this.ocultarTablas = true;
    }
    this.buscarTecnicosPorAnio('');
    this.buscarTecnicosPorMes('');
    this.refrescar();
  }

  buscarTecnicosPorAnio(buscar: any) {
    this.reporteTecnicoService.buscarTecnicosPorAnio({ param: buscar, fechaInicio: this.fechaInicio, fechaFinal: this.fechaFinal }).subscribe((data: ReporteTecnicoPorFecha[]) => {
      dataTecnicosAnio = data;
      this.refrescar();
    });
  }

  buscarTecnicosPorMes(buscar: any) {
    this.reporteTecnicoService.buscarTecnicosPorMes({ param: buscar, fechaInicio: this.fechaInicio, fechaFinal: this.fechaFinal }).subscribe((data: ReporteTecnicoPorFecha[]) => {
      dataTecnicosMes = data;
      this.refrescar();
    });
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<ReporteTecnicoPorFecha>(dataTecnicosMes);
    this.dataSource2 = new MatTableDataSource<ReporteTecnicoPorFecha>(dataTecnicosAnio);
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
  };

  exportExcelAnno() {
    let element = document.getElementById('tableAnno');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "TecnicosAños.xlsx");
  }

  exportExcelMes() {
    let element = document.getElementById('tableMes');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "TecnicosMes.xlsx");
  }
}