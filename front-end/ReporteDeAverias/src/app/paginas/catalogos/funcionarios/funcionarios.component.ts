import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Edificio } from 'src/app/core/modelos/edificio.model';
import { FuncionarioService } from 'src/app/core/servicios/catalogos/funcionario.service';
import { FuncionarioCatalogo } from 'src/app/core/modelos/funcionario.model';
import { Funcionario } from 'src/app/core/modelos/funcionario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EdificioService } from 'src/app/core/servicios/catalogos/edificio.service';
import { EliminarDialogComponent } from 'src/app/core/componentes/eliminar-dialog/eliminar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OficinaService } from 'src/app/core/servicios/catalogos/oficina.servise';
import { Oficina } from 'src/app/core/modelos/oficina.model';
import { Rol } from 'src/app/core/modelos/rol.model';
import { RolOficina } from 'src/app/core/modelos/rolOficina.model';
import { FuncionarioRolOficina } from 'src/app/core/modelos/funcionario.model';
import { FuncionarioEdificio } from 'src/app/core/modelos/funcionario.model';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';

let dataFuncionarios: Funcionario[];


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  hideRequiredControl = new FormControl(false);
  public buscar: string;
  public modificar: boolean;
  public desactivar: boolean;
  public selectedEdificio: any;
  public selectedRol: any;
  public selectedOficina: any;
  public dataEdificios: Edificio[];
  public dataRolOficina: RolOficina[];

  funcionario: FuncionarioCatalogo = new FuncionarioCatalogo("", "", "", "", "", "", "");

  listEdificios: any = [];
  dataOficinas: any = [];

  displayedColumns: string[] = ['tecnico', 'nombre', 'correo', 'usuario', 'acciones'];
  dataSource = new MatTableDataSource<Funcionario>([]);

  displayedColumnsEdificio: string[] = ['descripcion', 'acciones'];
  dataSourceEdificio = new MatTableDataSource<Edificio>([]);

  displayedColumnsRolOficiona: string[] = ['oficina', 'rol', 'acciones'];
  dataSourceRolOficiona = new MatTableDataSource<RolOficina>([]);

  dataRol: Rol[] = [{ TN_ID: 1, TC_Nombre: 'Administrador' }, { TN_ID: 2, TC_Nombre: 'Técnico' },
  { TN_ID: 3, TC_Nombre: 'Jefe Técnico' }, { TN_ID: 4, TC_Nombre: 'Usuario' }, { TN_ID: 5, TC_Nombre: 'Administrador Edificio' }]


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private oficinaService: OficinaService, private funcionarioService: FuncionarioService, private edificioService: EdificioService, public dialog: MatDialog) {
    this.buscar = '';
    this.modificar = false;
    this.desactivar = false;
    this.dataEdificios = [];
    this.dataRolOficina = [];
  }

  ngOnInit(): void {
    this.getFuncionarios();
    this.getEdificios();
    this.getOficinas();
    this.refrescar();
  }


  getOficinas() {
    return this.oficinaService.getOficinas().subscribe((data: Oficina[]) => {
      this.dataOficinas = data;
    })
  };
  getFuncionarios() {
    return this.funcionarioService.getFuncionarios().subscribe((data: Funcionario[]) => {
      dataFuncionarios = data;
      this.refrescar();
    })
  };

  getEdificios() {
    return this.edificioService.getEdificios().subscribe((data: Edificio[]) => {
      this.listEdificios = data;
    })
  };

  registrarFuncionario() {
    if (this.modificar == false) {
      if (this.funcionario.Nombre.length == 0 || this.funcionario.PrimerApellido.length == 0
        || this.funcionario.SegundoApellido.length == 0, this.funcionario.Identificacion.length == 0
        || this.funcionario.Correo.length == 0 || this.funcionario.Usuario.length == 0 || this.funcionario.Contrasenna.length == 0) {
        this.dialogoNotificacion("Debe completar todos los campos");
      } else {

        this.funcionarioService.registrarFuncionario(this.funcionario).subscribe((respuesta: string) => {
          this.dialogoNotificacion(respuesta);
          let listRolOficina: FuncionarioRolOficina[] = [];
          let listEdificios: FuncionarioEdificio[] = [];

          if (this.dataSourceRolOficiona.data.length != 0) {
            this.dataSourceRolOficiona.data.map((rolOficina) => {
              let temRolOficina = new FuncionarioRolOficina(rolOficina.TN_ID_Rol, rolOficina.TN_ID_Oficina);
              listRolOficina.push(temRolOficina);
            });

            this.funcionarioService.asignarRolOficina(listRolOficina).subscribe((respuesta: string) => {
              this.dialogoNotificacion(respuesta);
            });
          }
          if (this.dataSourceEdificio.data.length != 0) {
            this.dataSourceEdificio.data.map((edificio) => {
              let temRolOficina = new FuncionarioEdificio(edificio.TN_ID);
              listEdificios.push(temRolOficina);
            });
            this.funcionarioService.asignarEdificios(listEdificios).subscribe((respuesta: string) => {
              this.dialogoNotificacion(respuesta);
            });
          }
        });

        this.getFuncionarios();
        this.limpiar();
      }
    }
    else {
      this.modificarFuncionario();
    }
  }

  buscarEdificio(buscar: string) {

    if (buscar.length != 0) {
      this.funcionarioService.buscarFuncionario({ param: buscar }).subscribe((data: Funcionario[]) => {
        dataFuncionarios = data;
        this.refrescar();

      });
    }
    else {
      this.getFuncionarios();
    }
  }


  opcionModificar(ID: number, Nombre: string, PrimerApellido: string, SegundoApellido: string,
    Identificacion: string, Usuario: string, Correo: string) {
    this.funcionario.ID = ID;
    this.funcionario.Nombre = Nombre;
    this.funcionario.PrimerApellido = PrimerApellido;
    this.funcionario.SegundoApellido = SegundoApellido;
    this.funcionario.Identificacion = Identificacion;
    this.funcionario.Usuario = Usuario;
    this.funcionario.Correo = Correo;
    this.modificar = true;
    this.desactivar = true;
  }


  modificarFuncionario() {
    if (this.funcionario.Nombre == undefined || this.funcionario.PrimerApellido == undefined
      || this.funcionario.SegundoApellido == undefined, this.funcionario.Identificacion == undefined
      || this.funcionario.Correo == undefined || this.funcionario.Usuario == undefined) {
      this.dialogoNotificacion("Debe completar todos los campos");
    } else {
      this.funcionarioService.modificarFuncionario(this.funcionario).subscribe((respuesta: string) => {
        this.dialogoNotificacion(respuesta);
        this.getFuncionarios();
      });
    }
    this.limpiar();
  }

  dialogoEliminar(Id: number, rol: number, oficinaId: number) {
    const dialogo = this.dialog.open(EliminarDialogComponent, {
      data: {
        Id: Id,
        name: rol,
        oficina: oficinaId
      }
    });

    dialogo.afterClosed().subscribe(art => {
      if (art != undefined)
        this.eliminarFuncionario(art);
    });
  }

  eliminarFuncionario(element: any) {
    this.funcionarioService.eliminarFuncionario({ TN_ID: element.Id, idOficina: element.oficina, idRol: element.name }).subscribe((respuesta: string) => {
      this.dialogoNotificacion(respuesta);
      this.getFuncionarios();
    });
  }

  agregarOficinaRol() {
    if (this.selectedOficina != undefined && this.selectedRol != undefined) {
      var temOficinaRol = new RolOficina(this.selectedRol.TN_ID, this.selectedRol.TC_Nombre,
        this.selectedOficina.id, this.selectedOficina.nombre);
      this.dataRolOficina.push(temOficinaRol);
      this.refrescar();
    }
  }

  agregarEdificios() {
    if (this.selectedEdificio != undefined) {
      var temEdificio = new Edificio(this.selectedEdificio.tC_Nombre);
      temEdificio.TN_ID = this.selectedEdificio.tN_ID;
      this.dataEdificios.push(temEdificio);
      this.refrescar();
    }
  }

  removerRol(idRol: number, idOficina: number) {
    this.dataRolOficina.forEach((item, index) => {
      if (item.TN_ID_Rol == idRol && item.TN_ID_Oficina == idOficina) this.dataRolOficina.splice(index, 1);
    });
    this.refrescar();
  }

  removerEdificio(idEdificio: number) {
    this.dataEdificios.forEach((item, index) => {
      if (item.TN_ID == idEdificio) this.dataEdificios.splice(index, 1);
    });
    this.refrescar();
  }

  limpiar() {
    this.modificar = false;
    this.funcionario = new FuncionarioCatalogo("", "", "", "", "", "", "");
    this.desactivar = false;
    this.dataSourceEdificio = new MatTableDataSource<Edificio>([]);
    this.dataSourceRolOficiona = new MatTableDataSource<RolOficina>([]);
  }

  refrescar() {
    this.dataSource = new MatTableDataSource<Funcionario>(dataFuncionarios);
    this.dataSource.paginator = this.paginator;
    this.dataSourceEdificio = new MatTableDataSource<Edificio>(this.dataEdificios);
    this.dataSourceRolOficiona = new MatTableDataSource<RolOficina>(this.dataRolOficina);
  };

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }
}
