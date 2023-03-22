import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, retry, catchError } from "rxjs";
import { FuncionarioCatalogo } from "../../modelos/funcionario.model";
import { Funcionario } from "../../modelos/funcionario.model";
import { Utils } from "../../utilidades/util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

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
    responseType: 'text' as 'json'
  };
  // respuesta tipo json
  httpOptions2 = {
    headers: new HttpHeaders({
      "mimeType": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
  };

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlAPI + "listarUsuario", this.httpOptions2
    );
  }

  registrarFuncionario(data: FuncionarioCatalogo): Observable<any> {
    return this.http.post(this.urlAPI + 'registarUsuario', Utils.getFormData(data), this.httpOptions1);
  }

  buscarFuncionario(data: any): Observable<Funcionario[]> {
    return this.http.post<Funcionario[]>(this.urlAPI + 'buscarUsuario', Utils.getFormData(data), this.httpOptions2);
  }

  buscarFuncionarioPorRol(data: any): Observable<Funcionario[]> {
    return this.http.post<Funcionario[]>(this.urlAPI + 'buscarUsuarioPorRol', Utils.getFormData(data), this.httpOptions2);
  }

  modificarFuncionario(data: FuncionarioCatalogo): Observable<any> {
    return this.http.post(this.urlAPI + 'modificarUsuario', Utils.getFormData(data), this.httpOptions1);
  }
  eliminarFuncionario(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'eliminarUsuario', Utils.getFormData(data), this.httpOptions1);
  }
  asignarEdificios(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'asignarEdificios', Utils.getFormDataArray(data), this.httpOptions1);
  }

  asignarRolOficina(data: any): Observable<any> {
    return this.http.post(this.urlAPI + 'asignarRolOficina', Utils.getFormDataArray(data), this.httpOptions1);
  }
}
