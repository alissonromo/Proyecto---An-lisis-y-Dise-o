import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { Utils } from "../../utilidades/util";
import { MisReportes, MisReportesSeguimiento, Reporte, ReporteDatos } from "../../modelos/reporte.model";

@Injectable({
  providedIn: 'root'
})

export class ReporteService {
  urlAPI: string = environment.urlAPI;
  constructor(private http: HttpClient) {
    console.log('Servicio HTTP');
  }

  //respuesta tipo string
  httpOptions1 = {
    headers: new HttpHeaders({
      "mimeType": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    //withCredentials: true,
    responseType: 'text' as 'json'
  };
  // respuesta tipo json
  httpOptions2 = {
    headers: new HttpHeaders({
      "mimeType": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    //withCredentials: true
  };

  getReportes(data: any): Observable<ReporteDatos[]> {
    return this.http.post<ReporteDatos[]>(this.urlAPI + "listarReporte", Utils.getFormData(data), this.httpOptions2
    );
  }

  registrarReporte(data: ReporteDatos): Observable<any> {
    return this.http.post(this.urlAPI + 'registarReporte', Utils.getFormData(data), this.httpOptions1);
  }

  buscarReporte(data: any): Observable<ReporteDatos[]> {
    return this.http.post<ReporteDatos[]>(this.urlAPI + 'buscarReporte', Utils.getFormData(data), this.httpOptions2);
  }

  modificarReporte(data: ReporteDatos): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarReporte', Utils.getFormData(data), this.httpOptions1);
  }
  eliminarReporte(data: Reporte): Observable<any> {
    return this.http.post(this.urlAPI + 'eliminarReporte', Utils.getFormData(data), this.httpOptions1);
  }

  misReportes(data: any): Observable<MisReportes[]> {
    return this.http.post<MisReportes[]>(this.urlAPI + 'MisReportes', Utils.getFormData(data), this.httpOptions2);
  }

  misReportesSeguimiento(data: any): Observable<MisReportesSeguimiento[]> {
    return this.http.post<MisReportesSeguimiento[]>(this.urlAPI + 'MisReportesSeguimientos', Utils.getFormData(data), this.httpOptions2);
  }

  generarHojaTrabajo(data: any): Observable<Reporte[]> {
    return this.http.post<Reporte[]>(this.urlAPI + 'generarHojaTrabajo', Utils.getFormData(data), this.httpOptions2);
  }

  consultarAveria(data: any): Observable<ReporteDatos[]> {
    return this.http.post<ReporteDatos[]>(this.urlAPI + 'consultarAveria', Utils.getFormData(data), this.httpOptions2);
  }
}
