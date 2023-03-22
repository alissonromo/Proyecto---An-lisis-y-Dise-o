export interface Edificio {
  TN_ID: number;
  TC_Nombre: string;
}

export class Edificio implements Edificio {

  constructor(public TC_Nombre: string) {
  };


}
