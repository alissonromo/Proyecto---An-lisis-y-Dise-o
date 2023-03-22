import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Edificio } from 'src/app/core/modelos/edificio.model';
import { EstadoReporte } from 'src/app/core/modelos/estadoReporte.model';
import { Funcionario, FuncionarioTecnico } from 'src/app/core/modelos/funcionario.model';
import { ReporteDatos } from 'src/app/core/modelos/reporte.model';
import { ComentarioDatos, ReporteComentario } from 'src/app/core/modelos/reporteComentario.model';
import { ReporteTecnico } from 'src/app/core/modelos/reporteTecnico.model';
import { TipoReporte } from 'src/app/core/modelos/tipoReporte.model';
import { EstadoReporteService } from 'src/app/core/servicios/catalogos/estadoReporte.service';
import { FuncionarioService } from 'src/app/core/servicios/catalogos/funcionario.service';
import { PrioridadService } from 'src/app/core/servicios/catalogos/prioridad.service';
import { ReporteService } from 'src/app/core/servicios/catalogos/reporte.service';
import { ReporteComentarioService } from 'src/app/core/servicios/catalogos/reporteComentario.service';
import { ReporteTecnicoService } from 'src/app/core/servicios/catalogos/reporteTecnico.service';
import { TipoReporteService } from 'src/app/core/servicios/catalogos/tipoReporte.service';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';


let dataReporte: ReporteDatos[];
let dataReporteSeguimiento: ComentarioDatos[];
let dataUsuarioRol: Funcionario[];

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  public id: number;
  public usuarioId: number;
  public tipo: string;
  public descripcion: string;
  public edificio: string;
  public oficina: string;
  public estado: string;
  public estadoReporte: string;
  public usuario: string;
  public fechaInicio: string;
  public correo: string;
  public prioridad: string;
  public comentario: string;
  public ocultarTramite: boolean;
  public ocultarTecnicos: boolean;
  public comentarioPublico: boolean;
  public buscar: string;
  public montoMatriales: number;
  public horas: number;
  public minutos: number;
  public cantidadTareas: number;

  public numeroReporte: string;


  public tecnico: any;
  public dataTecnico: FuncionarioTecnico[];
  dataPrioridad: any = [];
  dataTipoReporte: any = [];
  dataEstados: any = [];
  dataEstadoReporte: any = [];
  dataUsuarioRol: any = [];

  dataSource = new MatTableDataSource<FuncionarioTecnico>([]);
  displayedColumns: string[] = ['nombre', 'acciones'];
  dataSource2 = new MatTableDataSource<ComentarioDatos>([]);
  displayedColumns2: string[] = ['estado', 'funcionario', 'comentario', 'fecha'];

  constructor(private route: ActivatedRoute, private reporteService: ReporteService, private comentarioService: ReporteComentarioService,
    private tipoReporteService: TipoReporteService, private estadoReporteService: EstadoReporteService, private usuarioService: FuncionarioService,
    private prioridadService: PrioridadService, private reporteTecnicoService: ReporteTecnicoService, public dialog: MatDialog) {
    this.id = 0;
    this.usuarioId = 0;
    this.tipo = '';
    this.descripcion = '';
    this.edificio = '';
    this.oficina = '';
    this.estado = 'Ingresado';
    this.estadoReporte = '';
    this.usuario = '';
    this.fechaInicio = '';
    this.prioridad = ''
    this.comentario = '';
    this.comentarioPublico = false;
    this.numeroReporte = '';
    this.buscar = '';

    this.montoMatriales = 0;
    this.horas = 0;
    this.minutos = 0;
    this.cantidadTareas = 0;

    dataReporte = [];
    dataReporteSeguimiento = [];
    dataUsuarioRol = [];
    this.dataPrioridad = [];
    this.dataTecnico = [];
    this.correo = '';
    this.ocultarTramite = false;
    this.ocultarTecnicos = false;
    this.tecnico = '';
  }

  ngOnInit(): void {
    const test = this.route.snapshot.paramMap.get('idReporte');
    this.llenarReporte(test + "");
    this.listarReporteComentario(localStorage.getItem('id') + '', test);
    this.getTipoReporte();
    this.getEstadoReporte();
    this.getFuncionarioPorRol(2 + '');
    this.getPrioridad();
    this.refrescar();
  }

  commentFC = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);

  llenarReporte(buscar: string) {
    if (buscar.length != 0) {
      this.reporteService.buscarReporte({ param: buscar, nombreRol: localStorage.getItem('rol'), idUsuario: localStorage.getItem('id'), nombreOficina: localStorage.getItem('oficina') }).subscribe((data: any) => {
        for (let index = 0; index < data.length; index++) {
          var fecha = new Date(data[index].fechaInicio);
          data[index].numeroReporte = fecha.getFullYear() + '-' + data[index].id;
        }
        dataReporte = data;
        this.numeroReporte = data[0].numeroReporte;
        this.id = data[0].id;
        this.oficina = data[0].oficina;
        this.edificio = data[0].edificio;
        this.descripcion = data[0].descripcion;
        this.tipo = data[0].tipo;
        this.usuarioId = data[0].usuarioId;
        this.prioridad = data[0].prioridad;
        this.cargarEmail(data[0].usuarioId);

      });
    }
    else {

    }
  }

  listarReporteComentario(buscar: string, idReporte: any) {
    this.comentarioService.getReporteComentario({ id: buscar, idReporte: idReporte }).subscribe((data: ComentarioDatos[]) => {
      dataReporteSeguimiento = data;
      this.refrescar();
    });

  }
  getTipoReporte() {
    return this.tipoReporteService.getTipoReporte().subscribe((data: TipoReporte[]) => {
      this.dataTipoReporte = data;
    })
  };

  getEstadoReporte() {
    var rol = localStorage.getItem('rol');
    var contador = 0;
    this.estadoReporteService.getEstadoReporte().subscribe((data: any[]) => {
      //this.dataEstados = data;
      for (let index = 0; index < data.length; index++) {
        if (rol == "Administrador Edificio" && (data[index].tC_Nombre == 'Aprobado' || data[index].tC_Nombre == 'Reprobado'
          || data[index].tC_Nombre == 'Cerrado' || data[index].tC_Nombre == 'Reabierto')) {

          this.dataEstadoReporte[contador] = data[index];
          contador++;
        }//Administrador Edificio
        if (rol == "Técnico" && (data[index].tC_Nombre == 'Tramitado')) {

          this.dataEstadoReporte[contador] = data[index];
          contador++;
        }//Tecnico
        if (rol == "Jefe Técnico" && (data[index].tC_Nombre == 'Cerrado' || data[index].tC_Nombre == 'Asignado')) {

          this.dataEstadoReporte[contador] = data[index];
          contador++;
        }//Jefe Tecnico
        if (rol == "Administrador") {

          this.dataEstadoReporte[contador] = data[index];
          contador++;
        }//Jefe Tecnico
      }

    })
  };

  cargarEstados() {
    this.getEstadoReporte();
    var rol = localStorage.getItem('rol');

    for (let index = 0; index < this.dataEstados.length; index++) {
      if (rol == "Administrador Edificio") {
        if (this.dataEstados[index] == 'Aprobado') {
          this.dataEstadoReporte = this.dataEstados[index];
        }
      }

    }
  }

  cargarEmail(param: any) {
    this.usuarioService.buscarFuncionario({ param: param }).subscribe((data: any) => {
      this.correo = data[0].correo;
    });
  }

  cargarTramitados() {
    if (this.estadoReporte == 'Tramitado') {
      this.ocultarTramite = true;
      this.ocultarTecnicos = false;
    } else if (this.estadoReporte == 'Asignado') {
      this.ocultarTecnicos = true;
      this.ocultarTramite = false;
    } else {
      this.ocultarTramite = false;
      this.ocultarTecnicos = false;
    }

  }

  getFuncionarioPorRol(param: any) {
    this.usuarioService.buscarFuncionarioPorRol({ param: param }).subscribe((data: any[]) => {
      this.dataUsuarioRol = data;

    });
  }

  agregarFuncionario() {
    if (this.tecnico != undefined) {
      var temTecnico = new FuncionarioTecnico(this.tecnico.id, this.tecnico.nombre
        , this.tecnico.primerApellido, this.tecnico.segundoApellido);

      temTecnico.TN_ID = this.tecnico.id;
      this.dataTecnico.push(temTecnico);

    }
    this.refrescar();
  }

  eliminarFuncionario(param: any) {
    this.dataTecnico.splice(param, 1);
    this.refrescar();

  }

  getPrioridad() {
    return this.prioridadService.getPrioridades().subscribe((data: any[]) => {
      this.dataPrioridad = data;
    });
  }

  guardarSeguimiento() {
    var seguimiento: ReporteDatos = new ReporteDatos('null',
      this.edificio, this.oficina, this.estadoReporte, this.tipo, this.prioridad, this.descripcion);

    seguimiento.ID = this.id;
    this.reporteService.modificarReporte(seguimiento).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.listarReporteComentario(localStorage.getItem('id') + '', this.route.snapshot.paramMap.get('idReporte'));
      this.refrescar();
    });
    if (this.commentFC.value != '') {
      this.modificarComentario();
    }
    if (localStorage.getItem('rol') == 'Administrador' || localStorage.getItem('rol') == 'Jefe Técnico') {
      this.registrarReporteTecnico();
    }

    if (localStorage.getItem('rol') == 'Administrador' || localStorage.getItem('rol') == 'Técnico') {
      this.modificarReporteTecnico();
    }
  }

  modificarComentario() {
    this.comentario = this.commentFC.value || '';
    var comentario: ReporteComentario = new ReporteComentario(this.id, this.usuarioId, this.comentario, this.comentarioPublico);
    this.comentarioService.modificarComentario(comentario).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.refrescar();
    });
  }

  registrarReporteTecnico() {
    for (let index = 0; index < this.dataTecnico.length; index++) {
      this.reporteTecnicoService.registrarReporteTecnico({ numReporte: this.id, idUsuarios: this.dataTecnico[index].TN_ID, idUsuarioActual: localStorage.getItem('id') }).subscribe((respuesta: string) => {
        // this.dialogoNotificacion(respuesta);

      });
    }
    this.refrescar();

  }

  modificarReporteTecnico() {

    var reporteTecnico: ReporteTecnico = new ReporteTecnico(this.id, localStorage.getItem('id') || 'null' , this.cantidadTareas, this.montoMatriales, this.horas, this.minutos, localStorage.getItem('id') || 'null');
    console.log(this.cantidadTareas+' '+ this.minutos+' '+this.horas+ ' '+ this.montoMatriales +' ' + this.id + ' '+ this.usuarioId );
    return this.reporteTecnicoService.modificarReporteTecnico(reporteTecnico).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
    });
  }

  buscarReporteComentario(buscar: string) {

    if (buscar.length != 0) {
      this.comentarioService.buscarReporteComentario({ param: buscar, idUsuario: localStorage.getItem('id') + "", idReporte: this.route.snapshot.paramMap.get('idReporte') }).subscribe((data: any[]) => {
        dataReporteSeguimiento = data;
        this.refrescar();
      });
    }
    else {
      this.listarReporteComentario(localStorage.getItem('id') + "", this.route.snapshot.paramMap.get('idReporte'));
    }
  }

  limpiar() {
    this.commentFC.setValue('');
    this.estadoReporte = '';
    this.comentarioPublico = false;
    this.ocultarTecnicos = false;
    this.ocultarTramite = false;
    this.montoMatriales = 0;
    this.horas = 0;
    this.minutos = 0;
    this.cantidadTareas = 0;
    this.dataTecnico = [];
    this.refrescar();
  }

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<FuncionarioTecnico>(this.dataTecnico);
    this.dataSource2 = new MatTableDataSource<ComentarioDatos>(dataReporteSeguimiento);
  };

}
