import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Oficina } from "../../modelos/oficina.model";
import { Utils } from "../../utilidades/util";

@Injectable({
    providedIn: 'root'
  })

  export class OficinaService{
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
    /*withCredentials: true,*/
    responseType: 'text' as 'json'
  };
// respuesta tipo json
  httpOptions2 = {
    headers: new HttpHeaders({
      "mimeType":"multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    })/*,
    withCredentials: true*/
  };

  getOficinas(): Observable<Oficina[]> {
    return this.http.get<Oficina[]>(this.urlAPI + "listarOficina", this.httpOptions2
    );
  }
  getOficinasPorEdificio(data: any): Observable<Oficina[]> {
    return this.http.post<Oficina[]>(this.urlAPI + "listarOficinaPorEdificio", Utils.getFormData(data), this.httpOptions2
    );
  }

  }

