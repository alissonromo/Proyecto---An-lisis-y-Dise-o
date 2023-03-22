import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { Edificio } from "../../modelos/edificio.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class EdificioService {

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

  getEdificios(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.urlAPI + "listarEdificio", this.httpOptions2
    );
  }

  registrarEdificio(data: Edificio): Observable<any> {
    return this.http.post(this.urlAPI + 'registarEdificio', Utils.getFormData(data), this.httpOptions1);
  }

  buscarEdificio(data: any): Observable<Edificio[]> {
    return this.http.post<Edificio[]>(this.urlAPI + 'buscarEdificio', Utils.getFormData(data), this.httpOptions2);
  }

  modificarEdificio(data: Edificio): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarEdificio', Utils.getFormData(data), this.httpOptions1);
  }
  eliminarEdificio(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'eliminarEdificio', Utils.getFormData(data), this.httpOptions1);
  }
}
