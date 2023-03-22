export interface Oficina {
  id: number;
  edificioId: number;
  edificio: string;
  codigo: string;
  nombre: string;
}

export class Oficina implements Oficina {

  constructor(public nombre: string) {

  };


}