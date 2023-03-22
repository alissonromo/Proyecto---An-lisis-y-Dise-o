import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/servicios/catalogos/reporte.service';
import { ReporteDatos } from 'src/app/core/modelos/reporte.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface Multi {
  name: any,
  series: any[]
}
interface General {
  name: any,
  value: any
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataReporte: any = [];
  dataAnno: any = [];
  dataAnnoSelect: any = [];
  dataTipo: any = [];
  dataEstado: any = [];
  dataEdificio: any = [];
  dataOficina: any = [];
  view: any = [700, 300];
  view2: any = [700, 200];
  annoSelect: number;


  // options grafico 1
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  yAxisLabel: string = 'Cantidad';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // options Grafico 2,3
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels2: boolean = true;
  isDoughnut: boolean = false;

  colorScheme2: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private reporteService: ReporteService) {
    this.dataReporte = [];
    this.annoSelect = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getReportes();
    this.selectAnno();
  }

  selectAnno() {
    let n = (new Date()).getFullYear();
    for (var i = n; i >= 1980; i--) {
      this.dataAnnoSelect.push(i);
    }
  };

  buscarAnno(anno: any) {
    this.annoSelect = anno;
    this.generarData();
  }

  getReportes() {
    return this.reporteService.getReportes({ nombreRol: localStorage.getItem('rol'), idUsuario: localStorage.getItem('id'), nombreOficina: localStorage.getItem('oficina') }).subscribe((data: ReporteDatos[]) => {
      this.dataReporte = data;
      this.generarData();
    })
  };

  generarData() {
    let arrayFechas: Date[] = [];
    let annoActual = this.annoSelect;
    //Grafico 1
    let arrayAnnos: Number[] = [];
    let annoTempData = [];
    //Grafico 2
    let arrayTipos: String[] = [];
    let tipoTempData = [];
    //Grafico 3
    let arrayEstado: String[] = [];
    let estadoTempData = [];
    //Garafico 5
    let arrayEdificio: String[] = [];
    let edificioTempData = [];
    //Grafico 6
    let arrayOficina: String[] = [];
    let oficinaTempData = [];

    this.dataReporte.map(function (valor: any) {
      arrayAnnos.push((new Date(valor.fechaInicio)).getFullYear());
      //Grafico 1
      arrayFechas.push((new Date(valor.fechaInicio)));
      //Grafico 2,3,4,5
      if (((new Date(valor.fechaInicio)).getFullYear()) == annoActual) {
        arrayTipos.push(valor.tipo);
        arrayEstado.push(valor.estado);
        arrayEdificio.push(valor.edificio);
        arrayOficina.push(valor.oficina);
      }
    });
    //Metodo volver unico arrayAños
    arrayAnnos = arrayAnnos.filter((item, index) => {
      return arrayAnnos.indexOf(item) === index;
    });
    let arrayTiposTemp = arrayTipos.filter((item, index) => {
      return arrayTipos.indexOf(item) === index;
    });
    let arrayEstadoTemp = arrayEstado.filter((item, index) => {
      return arrayEstado.indexOf(item) === index;
    });
    let arrayEdificioTemp = arrayEdificio.filter((item, index) => {
      return arrayEdificio.indexOf(item) === index;
    });
    let arrayOficinaTemp = arrayOficina.filter((item, index) => {
      return arrayOficina.indexOf(item) === index;
    });

    for (var i = 0; i < arrayAnnos.length; i++) {
      let multiStructureAnno: Multi = {
        name: arrayAnnos[i],
        series: [
          { name: "Enero", value: 0 }
          , { name: "Febrero", value: 0 + i }
          , { name: "Marzo", value: 0 + i }
          , { name: "Abril", value: 0 }
          , { name: "Mayo", value: 0 }
          , { name: "Junio", value: 0 }
          , { name: "Julio", value: 0 }
          , { name: "Agosto", value: 0 }
          , { name: "Septiembre", value: 0 }
          , { name: "Octubre", value: 0 }
          , { name: "Noviembre", value: 0 }
          , { name: "Diciembre", value: 0 }
        ]
      }
      for (var j = 0; j < arrayFechas.length; j++) {
        if (arrayAnnos[i] == arrayFechas[j].getFullYear()) {
          multiStructureAnno["series"][arrayFechas[j].getMonth()].value += 1;
        }
      }
      annoTempData.push(multiStructureAnno);
    }
    // grafico 2
    for (let i = 0; i < arrayTiposTemp.length; i++) {
      let structureTipo: General = { name: arrayTiposTemp[i], value: 0 };

      for (let j = 0; j < arrayTipos.length; j++) {
        if (arrayTiposTemp[i] == arrayTipos[j]) {
          structureTipo.value += 1;
        }
      }
      tipoTempData.push(structureTipo);
    }

    // grafico 3
    for (let i = 0; i < arrayEstadoTemp.length; i++) {
      let structureEstado: General = { name: arrayEstadoTemp[i], value: 0 };

      for (let j = 0; j < arrayEstado.length; j++) {
        if (arrayEstadoTemp[i] == arrayEstado[j]) {
          structureEstado.value += 1;
        }
      }
      estadoTempData.push(structureEstado);
    }

    // grafico 4
    for (let i = 0; i < arrayEdificioTemp.length; i++) {
      let structureEdificio: General = { name: arrayEdificioTemp[i], value: 0 };

      for (let j = 0; j < arrayEdificio.length; j++) {
        if (arrayEdificioTemp[i] == arrayEdificio[j]) {
          structureEdificio.value += 1;
        }
      }
      edificioTempData.push(structureEdificio);
    }

    // grafico 5
    for (let i = 0; i < arrayOficinaTemp.length; i++) {
      let structureOficina: General = { name: arrayOficinaTemp[i], value: 0 };

      for (let j = 0; j < arrayOficina.length; j++) {
        if (arrayOficinaTemp[i] == arrayOficina[j]) {
          structureOficina.value += 1;
        }
      }
      oficinaTempData.push(structureOficina);
    }


    this.dataAnno = annoTempData;
    this.dataTipo = tipoTempData;
    this.dataEstado = estadoTempData;
    this.dataEdificio = edificioTempData;
    this.dataOficina = oficinaTempData;
  }

}