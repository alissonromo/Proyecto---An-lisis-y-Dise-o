import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../../modelos/login.model";
import { Utils } from "../../utilidades/util";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  urlModulo: string = environment.urlModulo;
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
    })/*,
      withCredentials: true*/
  };

  buscarUsuario(data: any): Observable<Login> {
    return this.http.post<Login>(this.urlModulo + 'buscarUsuario', Utils.getFormData(data), this.httpOptions2);
  }

}
