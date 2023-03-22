import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { Edificio } from "../../modelos/edificio.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";
import { ComentarioDatos, ReporteComentario } from "../../modelos/reporteComentario.model";

@Injectable({
  providedIn: 'root'
})

export class ReporteComentarioService {

  urlAPI : string = environment.urlAPI;
  constructor(private http: HttpClient) {
    console.log('Servicio HTTP');
  }

  //respuesta tipo string
  httpOptions1 = {
    headers: new HttpHeaders({
      "mimeType":"multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    withCredentials: false,
    responseType: 'text' as 'json'
  };
// respuesta tipo json
  httpOptions2 = {
    headers: new HttpHeaders({
      "mimeType":"multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    withCredentials: false
  };

 getReporteComentario(data: any): Observable<ComentarioDatos[]> {
    return this.http.post<ComentarioDatos[]>(this.urlAPI + 'listarComentarios', Utils.getFormData(data), this.httpOptions2);
  }

  modificarComentario(data: ReporteComentario): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarComentario', Utils.getFormData(data), this.httpOptions1);
  }

  buscarReporteComentario(data: any): Observable<ComentarioDatos[]> {
    return this.http.post<ComentarioDatos[]>(this.urlAPI + 'buscarComentarios',Utils.getFormData(data), this.httpOptions2);
  }

}