import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Edificio } from 'src/app/core/modelos/edificio.model';
import { Funcionario } from 'src/app/core/modelos/funcionario.model';
import { MisReportes } from 'src/app/core/modelos/reporte.model';
import { EdificioService } from 'src/app/core/servicios/catalogos/edificio.service';
import { FuncionarioService } from 'src/app/core/servicios/catalogos/funcionario.service';
import { ReporteService } from 'src/app/core/servicios/catalogos/reporte.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

let dataHojaTrabajo: MisReportes[];

@Component({
  selector: 'app-hoja-trabajo',
  templateUrl: './hoja-trabajo.component.html',
  styleUrls: ['./hoja-trabajo.component.css']
})
export class HojaTrabajoComponent implements OnInit {

  public creador: string;
  public numero: string;
  public tipo: string;
  public descripcion: string;
  public edificio: any;
  public oficina: string;
  public estado: string;
  public comentario: string;
  public fechaSeguimiento: string;
  public asignado: string;
  public funcionarioSeguimiento: string;

  public edificioId: string;
  public usuarioId: string;
  public usuario: any;
  public numeroReporte: string;

  dataEdificio: any = [];
  dataUsuarioRol: any = [];

  dataSource = new MatTableDataSource<MisReportes>([]);
  displayedColumns: string[] = ['creador', 'numero', 'tipo', 'descripcion', 'edificio', 'oficina', 'estado', 'comentario'];


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private reporteService: ReporteService, private edificioService: EdificioService, private usuarioService: FuncionarioService) {
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
    this.edificioId = '';
    this.funcionarioSeguimiento = '';
    this.usuario = '';
    this.usuarioId = '';
    this.numeroReporte = '';

    dataHojaTrabajo = [];
  }

  ngOnInit(): void {

    this.getEdificio();
    this.getFuncionarioPorRol(2 + '');
    this.hojaTrabajo();
    this.refrescar();
  }

  getEdificio() {
    return this.edificioService.getEdificios().subscribe((data: Edificio[]) => {
      this.dataEdificio = data;
    })
  };


  getFuncionarioPorRol(param: any) {
    return this.usuarioService.buscarFuncionarioPorRol({ param: param }).subscribe((data: any[]) => {
      this.dataUsuarioRol = data;
    });
  }

  hojaTrabajo() {
    return this.reporteService.generarHojaTrabajo({ idUsuario: this.usuario.id, idEdificio: this.edificio.tN_ID, idUsuarioActual: localStorage.getItem('id') }).subscribe((data: any) => { // Lista de reportes
      for (let index = 0; index < data.length; index++) {
        var fecha = new Date(data[index].fechaSeguimiento);
        data[index].numeroReporte = fecha.getFullYear() + '-' + data[index].id;
      }
      dataHojaTrabajo = data;
      this.refrescar();
    });
  };

  refrescar() {
    this.dataSource = new MatTableDataSource<MisReportes>(dataHojaTrabajo);
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
