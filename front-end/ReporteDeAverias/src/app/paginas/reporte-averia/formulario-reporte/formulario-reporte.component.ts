import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from '../../../core/servicios/catalogos/reporte.service'
import { Reporte, ReporteDatos } from 'src/app/core/modelos/reporte.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoReporteService } from 'src/app/core/servicios/catalogos/tipoReporte.service';
import { TipoReporte } from 'src/app/core/modelos/tipoReporte.model';
import { EdificioService } from 'src/app/core/servicios/catalogos/edificio.service';
import { Edificio } from 'src/app/core/modelos/edificio.model';
import { OficinaService } from 'src/app/core/servicios/catalogos/oficina.servise';
import { Oficina } from 'src/app/core/modelos/oficina.model';
import { FormControl, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/core/servicios/catalogos/funcionario.service';
import { Router } from '@angular/router';
import { Utils } from "../../../core/utilidades/util";
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';

let dataReporte: ReporteDatos[];

@Component({
  selector: 'app-formulario-reporte',
  templateUrl: './formulario-reporte.component.html',
  styleUrls: ['./formulario-reporte.component.css']
  //longDescription: ['', [Validators.required, Validators.maxLength(20)]]
})

export class FormularioReporteComponent implements OnInit {
  public numero: number;
  public tipo: string;
  public descripcion: string;
  public edificio: string;
  public oficina: any;
  public estado: string;
  public usuario: string;
  public fecha: string;
  public buscar: string;
  public modificar: number;
  public correo: string;
  public numeroReporte: string;
  public ocultarSeguimiento: boolean;
  public permitir: boolean;


  dataTipoReporte: any = [];
  dataEdificios: any = [];
  dataOficinas: any = [];

  // Info de la tabla
  dataSource = new MatTableDataSource<ReporteDatos>([]);
  displayedColumns: string[] = ['numero', 'tipo', 'descripcion', 'edificio', 'oficina', 'estado', 'usuario', 'fecha', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private tipoReporteService: TipoReporteService, private edificioService: EdificioService, private usuarioService: FuncionarioService,
    private oficinaService: OficinaService, private reporteService: ReporteService, private router: Router, public dialog: MatDialog) {

    this.numero = 0;
    this.tipo = '';
    this.descripcion = '';
    this.edificio = '';
    this.oficina = localStorage.getItem('oficina');
    this.estado = 'Ingresado';
    this.usuario = '';
    this.fecha = '';
    this.buscar = '';
    this.correo = '';
    this.modificar = 0;
    dataReporte = [];
    this.numeroReporte = '';
    this.ocultarSeguimiento = false;
    this.permitir = false;


  }

  ngOnInit(): void {
    this.numero = new Date().getFullYear();;
    this.getReportes();
    this.getTipoReporte();
    this.getEdificios();
    this.cargarEmail(localStorage.getItem('usuario'));
    this.refrescar();
  }

  commentFC = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);



  getReportes() {
    return this.reporteService.getReportes({ nombreRol: localStorage.getItem('rol'), idUsuario: localStorage.getItem('id'), nombreOficina: localStorage.getItem('oficina') }).subscribe((data: any[]) => {
      var rol = localStorage.getItem('rol');
      for (let index = 0; index < data.length; index++) {
        var fecha = new Date(data[index].fechaInicio);
        data[index].numeroReporte = fecha.getFullYear() + '-' + data[index].id;
      }
      if (rol == 'Usuario') {
        this.ocultarSeguimiento = true;
      }

      dataReporte = data;
      this.refrescar();
    })
  };

  refrescar() {
    this.dataSource = new MatTableDataSource<ReporteDatos>(dataReporte);
    this.dataSource.paginator = this.paginator;
  };

  registrarReporte() {

    if (this.modificar == 0) {
      if (this.tipo.trim().length == 0 || this.commentFC.value == null) {
        this.dialogoNotificacion("Debe completar todos los campos");
      } else {
        this.descripcion = this.commentFC.value;
        this.reporteService.registrarReporte(new ReporteDatos(localStorage.getItem('usuario') || 'null',
          this.edificio, this.oficina, 'Ingresado', this.tipo, '1', this.descripcion)).subscribe((respuesta: string) => {
            this.dialogoNotificacion(respuesta);
            this.getReportes();
          });
      }
      this.limpiar();
    } else if (this.modificar == 1) {
      this.modificarReporte();
    }
  }

  getTipoReporte() {
    return this.tipoReporteService.getTipoReporte().subscribe((data: TipoReporte[]) => {
      this.dataTipoReporte = data;
    })
  };
  getEdificios() {
    return this.edificioService.getEdificios().subscribe((data: Edificio[]) => {
      this.dataEdificios = data;
      this.getOficinasPorEdificio();
    })
  };
  getOficinas() {
    return this.oficinaService.getOficinas().subscribe((data: Oficina[]) => {
      this.dataOficinas = data;
    })
  };

  getOficinasPorEdificio() {
    for (var i = 0; i < this.dataEdificios.length; i++) {
      this.oficinaService.getOficinasPorEdificio(this.dataEdificios[i]).subscribe((data: Oficina[]) => {
        this.dataOficinas = data;
        for (var j = 0; j < this.dataOficinas.length; j++) {
          if (this.dataOficinas[j].nombre == this.oficina) {
            this.edificio = this.dataOficinas[j].edificio;
          }
        }
      });
    }
  }

  buscarReporte(buscar: string) {

    if (buscar.length != 0) {
      this.reporteService.buscarReporte({ param: buscar, nombreRol: localStorage.getItem('rol'), idUsuario: localStorage.getItem('id'), nombreOficina: localStorage.getItem('oficina') }).subscribe((data: ReporteDatos[]) => {
        dataReporte = data;
        this.refrescar();
      });
    }
    else {
      this.getReportes();
    }
  }

  dialogoEliminar(Id: number, idUsuario: number, estado: string) {
    const dialogo = this.dialog.open(EliminarDialogComponent, {
      data: {
        Id: Id,
        name: "edificio"
      }
    });

    dialogo.afterClosed().subscribe(art => {
      if (art != undefined)
        this.eliminarReporte(art.Id, idUsuario, estado);
    });
  }

  eliminarReporte(Id: number, idUsuario: number, estado: string) {
    this.validarRoles(idUsuario, estado);

    if (this.permitir == true) {

      if (Id != 0) {
        this.reporteService.buscarReporte({ param: Id.toString(), nombreRol: localStorage.getItem('rol'), idUsuario: localStorage.getItem('id'), nombreOficina: localStorage.getItem('oficina') }).subscribe((data: ReporteDatos[]) => {
          dataReporte = data;
          this.reporteService.eliminarReporte(new Reporte(Id, parseInt(localStorage.getItem('id') || '0'),
            data[0].edificioId, data[0].oficinaId, data[0].estadoId,
            data[0].tipoId, data[0].prioridadId, data[0].descripcion,
            data[0].fechaInicio)).subscribe((respuesta: string) => {
              this.getReportes();
              this.limpiar();
            });

        });
      }
    } else {
      this.dialogoNotificacion("No esta permitido");
      this.modificar = 2;

    }

  }

  validarRoles(idUsuario: number, estado: string) {
    if ((localStorage.getItem('rol') == 'Usuario' || localStorage.getItem('rol') == 'Administrador') && estado == 'Ingresado') {
      this.permitir = true;
    } else if ((localStorage.getItem('rol') == 'Administrador Edificio' || localStorage.getItem('rol') == 'Jefe Técnico'
      || localStorage.getItem('rol') == 'Técnico') && localStorage.getItem('id') == idUsuario + "" && estado == 'Ingresado') {
      this.permitir = true;
    }
  }

  opcionModificar(id: number, tipo: string, descripcion: string, edificio: string,
    oficina: string, idUsuario: number, estado: string) {
    this.validarRoles(idUsuario, estado);

    if (this.permitir == true) {
      this.numero = id;
      this.tipo = tipo;
      this.descripcion = descripcion;
      this.edificio = edificio;
      this.oficina = oficina;
      this.usuario = localStorage.getItem('usuario') || 'null';
      this.cargarEmail(idUsuario);
      this.modificar = 1;
    } else {
      this.dialogoNotificacion('No esta permitido');
      this.modificar = 2;

    }

  }

  modificarReporte() {
    if (this.tipo.trim().length == 0 || this.commentFC.value == null) {
      this.dialogoNotificacion("Debe completar todos los campos");
    } else {
      this.descripcion = this.commentFC.value;
      var reporteModificado: ReporteDatos = new ReporteDatos(localStorage.getItem('usuario') || 'null',
        this.edificio, this.oficina, 'Ingresado', this.tipo, '1', this.descripcion);
      reporteModificado.ID = this.numero;
      this.reporteService.modificarReporte(reporteModificado).subscribe((respuesta: string) => {
        this.dialogoNotificacion(respuesta);
        this.getReportes();
      });
    }
    this.limpiar();
  }

  cargarEmail(param: any) {
    this.usuarioService.buscarFuncionario({ param: param }).subscribe((data: any) => {
      this.correo = data[0].correo;
    });
  }

  verSeguimiento(id: number) {
    this.router.navigate(["/inicio/seguimientoreporte", { idReporte: id }]);
  }

  limpiar() {

    this.tipo = '';
    this.commentFC.setValue('');
    this.descripcion = '';
    this.edificio = '';
    this.oficina = '';
    this.estado = '';
    this.usuario = '';
    this.fecha = '';
    this.buscar = '';
    this.modificar = 0;
    dataReporte = [];

  }


  public openPDF(element: any): void {

    let dataHeader = [["NumeroReporte", "Tipo", "Prioridad", "Descripcion", "Edificio", "Oficina", "Usuario", "Fecha"]];
    let data = [[element.numeroReporte, element.tipo, element.prioridad, element.descripcion, element.edificio, element.oficina,
    element.usuario, (new Date(element.fechaInicio).toUTCString())]];
    Utils.exportToPdf(dataHeader, data, "Reporte Avería " + new Date(), undefined);

  }

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }

}
