import { Component, OnInit, ViewChild } from '@angular/core';
import { EdificioService } from '../../../core/servicios/catalogos/edificio.service'
import { Edificio } from 'src/app/core/modelos/edificio.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';

let dataEdificios: Edificio[];

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html',
  styleUrls: ['./edificio.component.css']
})
export class EdificioComponent implements OnInit {
  public nombre: string;
  public buscar: string;
  public id: number;
  public modificar: boolean;

  dataSource = new MatTableDataSource<Edificio>([]);
  displayedColumns: string[] = ['descripcion', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private edificioService: EdificioService, public dialog: MatDialog) {

    this.nombre = '';
    this.buscar = '';
    this.id = 0;
    this.modificar = false;
    dataEdificios = [];

  }

  ngOnInit(): void {
    this.getEdificios();
    this.refrescar();
  }

  getEdificios() {
    return this.edificioService.getEdificios().subscribe((data: Edificio[]) => {
      dataEdificios = data;
      this.refrescar();
    })
  };

  registrarEdificio() {
    if (this.modificar == false) {
      if (this.nombre.trim().length == 0) {
        this.dialogoNotificacion("Debe completar todos los campos");
      } else {
        this.edificioService.registrarEdificio(new Edificio(this.nombre)).subscribe((respuesta: string) => {
          this.dialogoNotificacion(respuesta);
          this.getEdificios();
        });
      }
      this.limpiar();
    }
    else {
      this.modificarEdificio();
    }
  }

  buscarEdificio(buscar: string) {

    if (buscar.length != 0) {
      this.edificioService.buscarEdificio({ nombre: buscar }).subscribe((data: Edificio[]) => {
        dataEdificios = data;
        this.refrescar();
      });
    }
    else {
      this.getEdificios();
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
        this.eliminarEdificio(art.Id);
    });
  }
  eliminarEdificio(Id: number) {
    this.edificioService.eliminarEdificio({ TN_ID: Id }).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.getEdificios();
    });
  }

  opcionModificar(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.modificar = true;
  }

  modificarEdificio() {
    if (this.nombre.trim().length == 0) {
      this.dialogoNotificacion("Debe completar todos los campos");
    } else {
      var edificioModificado: Edificio = new Edificio(this.nombre);
      edificioModificado.TN_ID = this.id;
      this.edificioService.modificarEdificio(edificioModificado).subscribe((respuesta: string) => {
        this.dialogoNotificacion(respuesta);
        this.getEdificios();
      });
    }
    this.limpiar();
  }


  limpiar() {
    this.nombre = "";
    this.modificar = false;
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<Edificio>(dataEdificios);
    this.dataSource.paginator = this.paginator;
  };

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }
}

