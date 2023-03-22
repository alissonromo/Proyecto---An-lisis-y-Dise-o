import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Prioridad } from 'src/app/core/modelos/prioridad.model';
import { PrioridadService } from '../../../core/servicios/catalogos/prioridad.service';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';

let dataPrioridad: Prioridad[]

@Component({
  selector: 'app-prioridad-reporte',
  templateUrl: './prioridad-reporte.component.html',
  styleUrls: ['./prioridad-reporte.component.css']
})
export class PrioridadReporteComponent implements OnInit {
  public nombre: string;
  public buscar: string;
  public id: number;
  public modificar: boolean;

  dataSource = new MatTableDataSource<Prioridad>([]);
  displayedColumns: string[] = ['descripcion', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private PrioridadService: PrioridadService, public dialog: MatDialog) {
    console.log('el servico se ha creado');
    this.nombre = '';
    this.buscar = '';
    this.id = 0;
    this.modificar = false;
    dataPrioridad = [];

  }

  ngOnInit(): void {
    this.getPrioridades();
    this.refrescar();
  }

  getPrioridades() {
    return this.PrioridadService.getPrioridades().subscribe((data: Prioridad[]) => {
      dataPrioridad = data;
      this.refrescar();
    })
  };

  registrarPrioridad() {
    if (this.modificar == false) {
      if (this.nombre.trim().length == 0) {
        this.dialogoNotificacion("Debe completar todos los campos");
      } else {
        this.PrioridadService.registrarPrioridad(new Prioridad(this.nombre)).subscribe((respuesta: string) => {
          this.dialogoNotificacion(respuesta);
          this.getPrioridades();
        });
      }
      this.limpiar();
    }
    else {
      this.modificarPrioridad();
    }
  }

  buscarPrioridad(buscar: string) {

    if (buscar.length != 0) {
      this.PrioridadService.buscarPrioridad({ nombre: buscar }).subscribe((data: Prioridad[]) => {
        dataPrioridad = data;
        this.refrescar();

      });
    }
    else {
      this.getPrioridades();
    }
  }

  eliminarPrioridad(Id: number) {
    this.PrioridadService.eliminarPrioridad({ TN_ID: Id }).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.getPrioridades();
    });
  }

  opcionModificar(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.modificar = true;
  }

  modificarPrioridad() {
    if (this.nombre.trim().length == 0) {
      this.dialogoNotificacion("Debe completar todos los campos");
    } else {
      var PrioridadModificado: Prioridad = new Prioridad(this.nombre);
      PrioridadModificado.TN_ID = this.id;
      this.PrioridadService.modificarPrioridad(PrioridadModificado).subscribe((respuesta: string) => {
        this.dialogoNotificacion(respuesta);
        this.getPrioridades();
      });
    }
    this.limpiar();
  }


  limpiar() {
    this.nombre = "";
    this.modificar = false;
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<Prioridad>(dataPrioridad);
    this.dataSource.paginator = this.paginator;
  };

  dialogoEliminar(Id: number) {
    const dialogo = this.dialog.open(EliminarDialogComponent, {
      data: {
        Id: Id,
        name: "prioridad"
      }
    });

    dialogo.afterClosed().subscribe(art => {
      if (art != undefined)
        this.eliminarPrioridad(art.Id);
    });
  }

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }
}
