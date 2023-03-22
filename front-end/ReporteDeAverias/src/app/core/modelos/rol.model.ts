export interface Rol {
  TN_ID: number;
  TC_Nombre: string;
}

export class Rol implements Rol {

  constructor(public TN_ID: number, public TC_Nombre: string) {

  };


}