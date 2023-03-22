import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ReporteDatos } from 'src/app/core/modelos/reporte.model';
import { ReporteService } from 'src/app/core/servicios/catalogos/reporte.service';

let dataReporte: ReporteDatos[];

@Component({
  selector: 'app-consulta-averia',
  templateUrl: './consulta-averia.component.html',
  styleUrls: ['./consulta-averia.component.css']
})
export class ConsultaAveriaComponent implements OnInit {

  public numero: number;
  public tipo: string;
  public descripcion: string;
  public edificio: string;
  public oficina: string;
  public estado: string;
  public usuario: string;
  public fecha: string;
  public buscar: string;
  public modificar: boolean;
  public correo: string;
  public numeroReporte: string;
  public ocultarSeguimiento: boolean;
  public fechaInicio: string;
  public fechaFinal: string;

  dataSource = new MatTableDataSource<ReporteDatos>([]);
  displayedColumns: string[] = ['numero', 'prioridad', 'usuario', 'edificio', 'oficina', 'estado', 'tipo', 'descripcion', 'fecha', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private reporteService: ReporteService, private formBuilder: FormBuilder, private router: Router) {
    this.numero = 0;
    this.tipo = '';
    this.descripcion = '';
    this.edificio = '';
    this.oficina = '';
    this.estado = '';
    this.usuario = '';
    this.fecha = '';
    this.buscar = '';
    this.correo = '';
    this.modificar = false;
    this.numeroReporte = '';
    this.ocultarSeguimiento = true;

    this.fechaInicio = '';
    this.fechaFinal = '';

    /*this.inicio = new Date('MM-dd-yyyy');
    this.fin = new Date('MM-dd-yyyy');*/
    dataReporte = [];

  }

  rango = new FormGroup({
    inicio: new FormControl<Date | null>(null),
    fin: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    if (localStorage.getItem('rol') != 'Administrador') {
      this.ocultarSeguimiento = false;
    }
  }

  getReportes() {

    var fechaInicio2;
    var fechaFinal2;

    var mesInicio: any = (this.rango.controls.inicio.value?.getMonth());
    var mesFinal: any = (this.rango.controls.fin.value?.getMonth());
    this.fechaInicio = this.rango.controls.inicio.value?.getDate() + '-' + (mesInicio + 1) + '-' + this.rango.controls.inicio.value?.getFullYear();
    this.fechaFinal = this.rango.controls.fin.value?.getDate() + '-' + (mesFinal + 1) + '-' + this.rango.controls.fin.value?.getFullYear();

    return this.reporteService.consultarAveria({ fechaInicial: this.fechaInicio, fechaFinal: this.fechaFinal }).subscribe((data: any[]) => {
      for (let index = 0; index < data.length; index++) {
        var fecha = new Date(data[index].fechaInicio);
        data[index].numeroReporte = fecha.getFullYear() + '-' + data[index].id;
      }
      dataReporte = data;
      this.refrescar();
    })

  }

  verSeguimiento(id: number) {
    this.router.navigate(["/inicio/seguimientoreporte", { idReporte: id }]);
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<ReporteDatos>(dataReporte);
    this.dataSource.paginator = this.paginator;
  };
}
