import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { TipoReporte } from "../../modelos/tipoReporte.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TipoReporteService {

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

  getTipoReporte(): Observable<TipoReporte[]> {
    return this.http.get<TipoReporte[]>(this.urlAPI + "listarTipoReporte", this.httpOptions2
    );
  }

  registrarTipoReporte(data: TipoReporte): Observable<any> {
    return this.http.post(this.urlAPI + 'registarTipoReporte', Utils.getFormData(data), this.httpOptions1);
  }

  buscarTipoReporte(data: any): Observable<TipoReporte[]> {
    return this.http.post<TipoReporte[]>(this.urlAPI + 'buscarTipoReporte', Utils.getFormData(data), this.httpOptions2);
  }

  modificarTipoReporte(data: TipoReporte): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarTipoReporte', Utils.getFormData(data), this.httpOptions1);
  }
  eliminarTipoReporte(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'eliminarTipoReporte', Utils.getFormData(data), this.httpOptions1);
  }
}
