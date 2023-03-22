import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularMaterialModule} from './angular-material.module';
import { LoginComponent } from './paginas/login/login.component';
import { OficinaComponent } from './paginas/oficina/oficina.component';
import { FormularioReporteComponent } from './paginas/reporte-averia/formulario-reporte/formulario-reporte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { EdificioComponent } from './paginas/catalogos/edificio/edificio.component';
import { EstadoReporteComponent } from './paginas/catalogos/estado-reporte/estado-reporte.component';
import { TipoReporteComponent } from './paginas/catalogos/tipo-reporte/tipo-reporte.component';
import { PrioridadReporteComponent } from './paginas/catalogos/prioridad-reporte/prioridad-reporte.component';
import { FuncionariosComponent } from './paginas/catalogos/funcionarios/funcionarios.component';
import { MisReportesComponent } from './paginas/estadisticas/mis-reportes/mis-reportes.component';
import { TramitadoTecnicoComponent } from './paginas/estadisticas/tramitado-tecnico/tramitado-tecnico.component';
import { HojaTrabajoComponent } from './paginas/estadisticas/hoja-trabajo/hoja-trabajo.component';
import { DashboardComponent } from './paginas/estadisticas/dashboard/dashboard.component';
import { ConsultaAveriaComponent } from './paginas/reporte-averia/consulta-averia/consulta-averia.component';
import { SeguimientoComponent } from './paginas/reporte-averia/seguimiento/seguimiento.component';
import { MenuCatalogoComponent } from './core/componentes/menu-catalogo/menu-catalogo.component';
import { EliminarDialogComponent } from './core/componentes/eliminar-dialog/eliminar-dialog.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificacionDialogComponent } from './core/componentes/notificacion-dialog/notificacion-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OficinaComponent,
    FormularioReporteComponent,
    InicioComponent,
    EdificioComponent,
    EstadoReporteComponent,
    TipoReporteComponent,
    PrioridadReporteComponent,
    FuncionariosComponent,
    MisReportesComponent,
    TramitadoTecnicoComponent,
    HojaTrabajoComponent,
    DashboardComponent,
    ConsultaAveriaComponent,
    SeguimientoComponent,
    MenuCatalogoComponent,
    EliminarDialogComponent,
    NotificacionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AngularMaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
