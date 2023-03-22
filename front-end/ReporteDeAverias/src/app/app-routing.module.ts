import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './paginas/login/login.component';
import {OficinaComponent} from './paginas/oficina/oficina.component';
import {InicioComponent} from './paginas/inicio/inicio.component';
import { FormularioReporteComponent } from './paginas/reporte-averia/formulario-reporte/formulario-reporte.component';
import { DashboardComponent } from './paginas/estadisticas/dashboard/dashboard.component';
import { HojaTrabajoComponent } from './paginas/estadisticas/hoja-trabajo/hoja-trabajo.component';
import { MisReportesComponent } from './paginas/estadisticas/mis-reportes/mis-reportes.component';
import { TramitadoTecnicoComponent } from './paginas/estadisticas/tramitado-tecnico/tramitado-tecnico.component';
import { EdificioComponent } from './paginas/catalogos/edificio/edificio.component';
import { EstadoReporteComponent } from './paginas/catalogos/estado-reporte/estado-reporte.component';
import { FuncionariosComponent } from './paginas/catalogos/funcionarios/funcionarios.component';
import { PrioridadReporteComponent } from './paginas/catalogos/prioridad-reporte/prioridad-reporte.component';
import { TipoReporteComponent } from './paginas/catalogos/tipo-reporte/tipo-reporte.component';
import { ConsultaAveriaComponent } from './paginas/reporte-averia/consulta-averia/consulta-averia.component';
import { SeguimientoComponent } from './paginas/reporte-averia/seguimiento/seguimiento.component';

const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'oficina', component: OficinaComponent},
  {path:'inicio', component: InicioComponent,children:[
    {path:'consultareportes', component:ConsultaAveriaComponent},
    {path:'crearreporte', component:FormularioReporteComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'hojatrabajo', component:HojaTrabajoComponent},
    {path:'misreportes', component:MisReportesComponent},
    {path:'tramitadotecnico', component:TramitadoTecnicoComponent},
    {path:'edificio', component:EdificioComponent},
    {path:'estadoreporte', component:EstadoReporteComponent},
    {path:'funcionarios', component:FuncionariosComponent},
    {path:'prioridadreporte', component:PrioridadReporteComponent},
    {path:'tiporeporte', component:TipoReporteComponent},
    {path:'seguimientoreporte', component:SeguimientoComponent}
  ]},
   {path:'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
