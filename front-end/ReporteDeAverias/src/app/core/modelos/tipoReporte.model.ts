export interface TipoReporte {
  TN_ID: number;
  TC_Nombre: string;
}

export class TipoReporte implements TipoReporte {

  constructor(public TC_Nombre: string) {

  };


}
