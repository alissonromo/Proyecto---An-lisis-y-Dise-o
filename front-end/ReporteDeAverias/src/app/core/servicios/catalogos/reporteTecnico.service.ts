import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { Edificio } from "../../modelos/edificio.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";
import { ComentarioDatos, ReporteComentario } from "../../modelos/reporteComentario.model";
import { ReporteTecnicoPorFecha } from "../../modelos/reporteTecnico.model";

@Injectable({
  providedIn: 'root'
})

export class ReporteTecnicoService {

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
    withCredentials: false,
    responseType: 'text' as 'json'
  };
  // respuesta tipo json
  httpOptions2 = {
    headers: new HttpHeaders({
      "mimeType": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    withCredentials: false
  };

  registrarReporteTecnico(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'asignarTecnico', Utils.getFormData(data), this.httpOptions1);
  }

  modificarReporteTecnico(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarReporteTecnico', Utils.getFormData(data), this.httpOptions1);
  }

  buscarTecnicosPorAnio(data: any): Observable<ReporteTecnicoPorFecha[]> {
    return this.http.post<ReporteTecnicoPorFecha[]>(this.urlAPI + 'buscarTecnicosPorAnio', Utils.getFormData(data), this.httpOptions2);
  }

  buscarTecnicosPorMes(data: any): Observable<ReporteTecnicoPorFecha[]> {
    return this.http.post<ReporteTecnicoPorFecha[]>(this.urlAPI + 'buscarTecnicosPorMes', Utils.getFormData(data), this.httpOptions2);
  }

}
