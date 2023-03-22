export interface Reporte {
    TN_ID: number;
    TN_UsuarioId: number;
    TN_EdificioId: number;
    TN_OficinaId: number;
    TN_EstadoId: number;
    TN_TipoId: number;
    TN_PrioridadId: number;
    TC_Descripcion: string;
    TF_FechaInicio: Date;
    TF_FechaFinal: any;
}
export interface ReporteDatos {
    ID: number;
    usuarioId: number;
    Usuario: string;
    edificioId: number;
    Edificio: string;
    oficinaId: number;
    Oficina: string;
    estadoId: number;
    Estado: string;
    tipoId: number;
    Tipo: string;
    prioridadId: number;
    Prioridad: string;
    descripcion: string;
    fechaInicio: Date;
    numeroReporte: string;
}

export interface MisReportes {
    ID: number;
    UsuarioId: number;
    Usuario: string;
    EdificioId: number;
    Edificio: string;
    OficinaId: number;
    Oficina: string;
    EstadoId: number;
    Estado: string;
    TipoId: number;
    Tipo: string;
    PrioridadId: number;
    Prioridad: string;
    Descripcion: string;
    Comentario: string;

    FechaSeguimiento: Date
    UsuarioAsignadoId: number
    UsuarioAsignado: string
    UsuarioSeguimientoId: number
    UsuarioSeguimiento: string
}

export interface MisReportesSeguimiento {
    ReporteId: number
    UsuarioId: number
    FechaSeguimiento: Date
    UsuarioAsignadoId: number
    UsuarioAsignado: string
    UsuarioSeguimientoId: number
    UsuarioSeguimiento: string
}

export class Reporte implements Reporte {

    constructor(TN_ID: number, TN_UsuarioId: number, TN_EdificioId: number, TN_OficinaId: number,
        TN_EstadoId: number, TN_TipoId: number, TN_PrioridadId: number, TC_Descripcion: string,
        TF_FechaInicio: Date) {

        this.TN_ID = TN_ID;
        this.TN_UsuarioId = TN_UsuarioId;
        this.TN_EdificioId = TN_EdificioId;
        this.TN_OficinaId = TN_OficinaId;
        this.TN_EstadoId = TN_EstadoId;
        this.TN_TipoId = TN_TipoId;
        this.TN_PrioridadId = TN_PrioridadId;
        this.TC_Descripcion = TC_Descripcion;
        this.TF_FechaInicio = TF_FechaInicio;
        this.TF_FechaFinal = null;

    };

}

export class ReporteDatos implements ReporteDatos {

    constructor(public Usuario: string, Edificio: string, Oficina: string,
        Estado: string, Tipo: string, Prioridad: string, Descripcion: string) {

        this.ID = 0;
        this.usuarioId = 0;
        this.Usuario = Usuario;
        this.edificioId = 0;
        this.Edificio = Edificio;
        this.oficinaId = 0;
        this.Oficina = Oficina;
        this.estadoId = 0;
        this.Estado = Estado;
        this.tipoId = 0;
        this.Tipo = Tipo;
        this.prioridadId = 0;
        this.Prioridad = Prioridad;
        this.descripcion = Descripcion;
        this.fechaInicio = new Date();

    };

}

export class MisReportes implements MisReportes {

    constructor(public Usuario: string) {
    };

}