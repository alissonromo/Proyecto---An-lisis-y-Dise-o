export interface RolOficina {
  TN_ID_Rol: number;
  TC_Nombre_Rol: string;
  TN_ID_Oficina: number;
  TC_Nombre_Oficina: string;
}

export class RolOficina implements RolOficina {

  constructor(public TN_ID_Rol: number, public TC_Nombre_Rol: string,
    public TN_ID_Oficina: number, public TC_Nombre_Oficina: string) {

  };
}
