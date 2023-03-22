export interface Login {
  ID: number;
  Usuario: string;
  Contrasenna: string;
}

export class Login implements Login {

  constructor(public Usuario: string, public Contrasenna: string, public ID: number) {

  };


}