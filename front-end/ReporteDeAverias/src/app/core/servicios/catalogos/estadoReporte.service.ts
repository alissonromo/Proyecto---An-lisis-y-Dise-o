import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { EstadoReporte } from "../../modelos/estadoReporte.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class EstadoReporteService {

  urlAPI: string = environment.urlAPI;
  constructor(private http: HttpClient) {
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

  getEstadoReporte(): Observable<EstadoReporte[]> {
    return this.http.get<EstadoReporte[]>(this.urlAPI + "listarEstadoReporte", this.httpOptions2
    );
  }

  registrarEstadoReporte(data: EstadoReporte): Observable<any> {
    return this.http.post(this.urlAPI + 'registarEstadoReporte', Utils.getFormData(data), this.httpOptions1);
  }

  buscarEstadoReporte(data: any): Observable<EstadoReporte[]> {
    return this.http.post<EstadoReporte[]>(this.urlAPI + 'buscarEstadoReporte', Utils.getFormData(data), this.httpOptions2);
  }

  modificarEstadoReporte(data: EstadoReporte): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarEstadoReporte', Utils.getFormData(data), this.httpOptions1);
  }
  eliminarEstadoReporte(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'eliminarEstadoReporte', Utils.getFormData(data), this.httpOptions1);
  }
}
