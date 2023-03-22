import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoReporte } from 'src/app/core/modelos/tipoReporte.model';
import { TipoReporteService } from 'src/app/core/servicios/catalogos/tipoReporte.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';

let dataTipoReporte: TipoReporte[];

@Component({
  selector: 'app-tipo-reporte',
  templateUrl: './tipo-reporte.component.html',
  styleUrls: ['./tipo-reporte.component.css']
})
export class TipoReporteComponent implements OnInit {
  public nombre: string;
  public buscar: string;
  public id: number;
  public modificar: boolean;

  dataSource = new MatTableDataSource<TipoReporte>([]);
  displayedColumns: string[] = ['descripcion', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private tipoReporteService: TipoReporteService, public dialog: MatDialog) {
    this.nombre = '';
    this.buscar = '';
    this.id = 0;
    this.modificar = false;
    dataTipoReporte = [];
  }

  ngOnInit(): void {
    this.getTipoReporte();
    this.refrescar();
  }

  getTipoReporte() {
    return this.tipoReporteService.getTipoReporte().subscribe((data: TipoReporte[]) => {
      dataTipoReporte = data;
      this.refrescar();
    })
  };

  registrarTipoReporte() {
    if (this.modificar == false) {
      if (this.nombre.trim().length == 0) {
        this.dialogoNotificacion("Debe completar todos los campos");
      } else {
        this.tipoReporteService.registrarTipoReporte(new TipoReporte(this.nombre)).subscribe((respuesta: string) => {
          this.dialogoNotificacion(respuesta);
          this.getTipoReporte();
        });
      }
      this.limpiar();
    }
    else {
      this.modificarTipoReporte();
    }
  }

  buscarTipoReporte(buscar: string) {

    if (buscar.length != 0) {
      this.tipoReporteService.buscarTipoReporte({ nombre: buscar }).subscribe((data: TipoReporte[]) => {
        dataTipoReporte = data;
        this.refrescar();

      });
    }
    else {
      this.getTipoReporte();
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
        this.eliminarTipoReporte(art.Id);
    });
  }

  eliminarTipoReporte(Id: number) {
    this.tipoReporteService.eliminarTipoReporte({ TN_ID: Id }).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.getTipoReporte();
    });
  }

  opcionModificar(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.modificar = true;
  }

  modificarTipoReporte() {
    if (this.nombre.trim().length == 0) {
      this.dialogoNotificacion("Debe completar todos los campos");
    } else {
      var tipoModificado: TipoReporte = new TipoReporte(this.nombre);
      tipoModificado.TN_ID = this.id;
      this.tipoReporteService.modificarTipoReporte(tipoModificado).subscribe((respuesta: string) => {
        this.dialogoNotificacion(respuesta);
        this.getTipoReporte();
      });
    }
    this.limpiar();
  }

  limpiar() {
    this.nombre = "";
    this.modificar = false;
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<TipoReporte>(dataTipoReporte);
    this.dataSource.paginator = this.paginator;
  };

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }
}
