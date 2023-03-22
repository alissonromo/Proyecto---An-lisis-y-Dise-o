import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionDialogComponent } from 'src/app/core/componentes/notificacion-dialog/notificacion-dialog.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  DatosAdministradorEdificio: any;
  DatosUsuario: any;
  DatosTecnico: any;
  DatosJefeTecnico: any;
  DatosAdministrador: any;
  UserName: any;
  Rol: any;

  constructor(private observer: BreakpointObserver, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activar();
  }

  activar(): void {
    if (localStorage.getItem("rol") != null && localStorage.getItem("usuario") != null) {
      if (localStorage.getItem("rol") === "Administrador Edificio") {
        this.DatosAdministradorEdificio = true;
      } else {
        this.DatosAdministradorEdificio = false;
      }
      if (localStorage.getItem("rol") === "Usuario") {
        this.DatosUsuario = true
      } else {
        this.DatosUsuario = false;
      }
      if (localStorage.getItem("rol") === "Administrador") {
        this.DatosAdministrador = true
      } else {
        this.DatosAdministrador = false;
      }
      if (localStorage.getItem("rol") === "Jefe Técnico") {
        this.DatosJefeTecnico = true
      } else {
        this.DatosJefeTecnico = false;
      }
      if (localStorage.getItem("rol") === "Técnico") {
        this.DatosTecnico = true
      } else {
        this.DatosTecnico = false;
      }
      this.UserName = localStorage.getItem('usuario');
      this.Rol = localStorage.getItem('rol');
    }
    else {
      this.dialogoNotificacion("Inicie Sesion");
      this.router.navigate(["login"]);
    }
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  dialogoNotificacion(Mensaje: string) {
    const dialogo = this.dialog.open(NotificacionDialogComponent, {
      data: { Mensaje: Mensaje }
    });
  }

  openNewTab() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(["/assets/Manual_de_Usuario.pdf"])
    );

    window.open(url, '_blank');
  }
}
