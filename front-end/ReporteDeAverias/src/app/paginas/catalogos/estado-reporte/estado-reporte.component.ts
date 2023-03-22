import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoReporteService } from 'src/app/core/servicios/catalogos/estadoReporte.service';
import { EstadoReporte } from 'src/app/core/modelos/estadoReporte.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';

let dataEstadoReporte: EstadoReporte[];

@Component({
  selector: 'app-estado-reporte',
  templateUrl: './estado-reporte.component.html',
  styleUrls: ['./estado-reporte.component.css']
})
export class EstadoReporteComponent implements OnInit {
  public nombre: string;
  public buscar: string;
  public id: number;
  public modificar: boolean;

  dataSource = new MatTableDataSource<EstadoReporte>([]);
  displayedColumns: string[] = ['descripcion', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private estadoReporteService: EstadoReporteService, public dialog: MatDialog) {
    this.nombre = '';
    this.buscar = '';
    this.id = 0;
    this.modificar = false;
    dataEstadoReporte = [];
  }

  ngOnInit(): void {
    this.getEstadoReporte();
    this.refrescar();
  }


  getEstadoReporte() {
    return this.estadoReporteService.getEstadoReporte().subscribe((data: EstadoReporte[]) => {
      dataEstadoReporte = data;
      this.refrescar();
    })
  };

  registrarEstadoReporte() {
    if (this.modificar == false) {
      if (this.nombre.trim().length == 0) {
        this.dialogoNotificacion("Debe completar todos los campos");
      } else {
        this.estadoReporteService.registrarEstadoReporte(new EstadoReporte(this.nombre)).subscribe((respuesta: string) => {
          this.dialogoNotificacion(respuesta);
          this.getEstadoReporte();
        });
      }
      this.limpiar();
    }
    else {
      this.modificarEstadoReporte();
    }
  }

  buscarEstadoReporte(buscar: string) {

    if (buscar.length != 0) {
      this.estadoReporteService.buscarEstadoReporte({ nombre: buscar }).subscribe((data: EstadoReporte[]) => {
        dataEstadoReporte = data;
        this.refrescar();
      });
    }
    else {
      this.getEstadoReporte();
    }
  }


  dialogoEliminar(Id: number) {
    const dialogo = this.dialog.open(EliminarDialogComponent, {
      data: {
        Id: Id,
        name: "edificio"
      }
    });

    dialogo.afterClosed().subscribe(art => {
      if (art != undefined)
        this.eliminarEstadoReporte(art.Id);
    });
  }
  eliminarEstadoReporte(Id: number) {
    this.estadoReporteService.eliminarEstadoReporte({ TN_ID: Id }).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.getEstadoReporte();
    });
  }

  opcionModificar(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.modificar = true;
  }

  modificarEstadoReporte() {
    if (this.nombre.trim().length == 0) {
      this.dialogoNotificacion("Debe completar todos los campos");
    } else {
      var estadoModificado: EstadoReporte = new EstadoReporte(this.nombre);
      estadoModificado.TN_ID = this.id;
      this.estadoReporteService.modificarEstadoReporte(estadoModificado).subscribe((respuesta: string) => {
        this.dialogoNotificacion(respuesta);
        this.getEstadoReporte();
      });
    }
    this.limpiar();
  }


  limpiar() {
    this.nombre = "";
    this.modificar = false;
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<EstadoReporte>(dataEstadoReporte);
    this.dataSource.paginator = this.paginator;
  };

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }
}
