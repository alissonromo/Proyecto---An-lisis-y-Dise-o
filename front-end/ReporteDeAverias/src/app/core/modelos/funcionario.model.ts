export interface Funcionario {
  TN_ID: number;
  TC_Nombre: string;
  TC_Usuario: string;
  TC_Correo: string;
}

export interface FuncionarioTecnico {
  TN_ID: number;
  TC_Nombre: string;
  TC_PrimerApellido: string;
  TC_SegundoApellido: string;
}

export interface FuncionarioCatalogo {
  ID: number;
  Nombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  TipoIdentificacionId: number;
  Identificacion: string;
  Usuario: string;
  Contrasenna: string;
  Correo: string;
}

export class FuncionarioCatalogo implements FuncionarioCatalogo {

  constructor(public Nombre: string,
    public PrimerApellido: string,
    public SegundoApellido: string,
    public Identificacion: string,
    public Usuario: string,
    public Contrasenna: string,
    public Correo: string) {

    this.TipoIdentificacionId = 1;

  };


}

export class Funcionario implements Funcionario {

  constructor(public TC_Nombre: string, public TC_Usuario: string, public TC_Correo: string) {
    this.TC_Nombre = TC_Nombre;
    this.TC_Usuario = TC_Usuario;
    this.TC_Correo = TC_Correo;
  };


}

export class FuncionarioTecnico implements FuncionarioTecnico {

  constructor(public TN_ID: number, public TC_Nombre: string, public TC_PrimerApellido: string, public TC_SegundoApellido: string) {
    this.TN_ID = TN_ID;
    this.TC_Nombre = TC_Nombre;
    this.TC_PrimerApellido = TC_PrimerApellido;
    this.TC_SegundoApellido = TC_SegundoApellido;
  };


}

export interface FuncionarioEdificio {
  idEdificio: number;
}
export class FuncionarioEdificio implements FuncionarioEdificio {

  constructor(public idEdificio: number) {
  };

}

export interface FuncionarioRolOficina {
  idRol: number;
  idOficinas: number;

}
export class FuncionarioRolOficina implements FuncionarioRolOficina {

  constructor(public idRol: number, public idOficinas: number) {
  };


}
