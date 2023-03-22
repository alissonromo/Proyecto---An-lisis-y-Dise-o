import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { Prioridad } from "../../modelos/prioridad.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PrioridadService {

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

  getPrioridades(): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(this.urlAPI + "listarPrioridad", this.httpOptions2
    );
  }

  registrarPrioridad(data: Prioridad): Observable<any> {
    return this.http.post(this.urlAPI + 'registarPrioridad', Utils.getFormData(data), this.httpOptions1);
  }

  buscarPrioridad(data: any): Observable<Prioridad[]> {
    return this.http.post<Prioridad[]>(this.urlAPI + 'buscarPrioridad', Utils.getFormData(data), this.httpOptions2);
  }

  modificarPrioridad(data: Prioridad): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarPrioridad', Utils.getFormData(data), this.httpOptions1);
  }
  eliminarPrioridad(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'eliminarPrioridad', Utils.getFormData(data), this.httpOptions1);
  }
}
