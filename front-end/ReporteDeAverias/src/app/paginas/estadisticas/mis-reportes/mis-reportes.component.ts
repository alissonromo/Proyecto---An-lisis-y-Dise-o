import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from 'src/app/core/modelos/funcionario.model';
import { MisReportes, MisReportesSeguimiento } from 'src/app/core/modelos/reporte.model'; //MisReportesSeguimiento, ReporteDatos
import { FuncionarioService } from 'src/app/core/servicios/catalogos/funcionario.service';
import { ReporteService } from 'src/app/core/servicios/catalogos/reporte.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

let dataMisReportes: MisReportes[];
let datoSeguimiento: MisReportesSeguimiento[];

@Component({
  selector: 'app-mis-reportes',
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css']
})
export class MisReportesComponent implements OnInit {

  public creador: string;
  public numero: string;
  public tipo: string;
  public descripcion: string;
  public edificio: string;
  public oficina: string;
  public estado: string;
  public comentario: string;
  public fechaSeguimiento: string;
  public asignado: string;
  public funcionarioSeguimiento: string;
  public numeroReporte: string;

  dataSource = new MatTableDataSource<MisReportes>([]);
  displayedColumns: string[] = ['creador', 'numero', 'tipo', 'descripcion', 'edificio', 'oficina', 'estado', 'comentario', 'fechaSeguimiento', 'asignado', 'funcionarioSeguimiento'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private reporteService: ReporteService, private usuarioService: FuncionarioService) {
    this.creador = '';
    this.numero = '';
    this.tipo = '';
    this.descripcion = '';
    this.edificio = '';
    this.oficina = '';
    this.estado = '';
    this.comentario = '';
    this.fechaSeguimiento = '';
    this.asignado = '';
    this.funcionarioSeguimiento = '';
    this.numeroReporte = '';

    dataMisReportes = [];
    datoSeguimiento = [];
  }

  ngOnInit(): void {
    this.misReportes(localStorage.getItem('id'));
    this.refrescar();
  }

  misReportes(buscar: any) {

    return this.reporteService.misReportes({ idUsuario: buscar }).subscribe((data: any) => { // Lista de reportes
      for (let index = 0; index < data.length; index++) {
        var fecha = new Date(data[index].fechaSeguimiento);
        data[index].numeroReporte = fecha.getFullYear() + '-' + data[index].id;
      }
      dataMisReportes = data;
      this.refrescar();
    });
  };


  misReportesSeguimiento(buscar: any) {  //idReporte

    return this.reporteService.misReportesSeguimiento({ idReporte: buscar }).subscribe((data: MisReportesSeguimiento[]) => {
      datoSeguimiento = data;
    });
  };

  refrescar() {
    this.dataSource = new MatTableDataSource<MisReportes>(dataMisReportes);
    this.dataSource.paginator = this.paginator;
  };

  openPDF() {
    let DATA: any = document.getElementById('dataTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('hoja-trabajo.pdf');
    });
  }
}
