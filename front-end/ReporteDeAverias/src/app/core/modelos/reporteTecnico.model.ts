export interface ReporteTecnico {
    TN_ReporteId: number;
    TN_UsuarioId: string;
    TN_CantidadTareas: number;
    TN_MontoMateriales: number;
    TN_Horas: number;
    TN_Minutos: number;
    TN_FuncionarioSeguimiento: string;
    TF_FechaSeguimiento: string;
}

export interface ReporteTecnicoPorFecha {
    Anio: number;
    Mes: string;
    NombreUsuario: string;
    Cantidad: number;
}

export class ReporteTecnico implements ReporteTecnico {

    constructor(TN_ReporteId: number, TN_UsuarioId: string, TN_CantidadTareas: number, TN_MontoMateriales: number,
        TN_Horas: number, TN_Minutos: number, TN_FuncionarioSeguimiento: string) {
        this.TN_ReporteId = TN_ReporteId;
        this.TN_UsuarioId = TN_UsuarioId;
        this.TN_CantidadTareas = TN_CantidadTareas;
        this.TN_MontoMateriales = TN_MontoMateriales;
        this.TN_Horas = TN_Horas;
        this.TN_Minutos = TN_Minutos;
        this.TN_FuncionarioSeguimiento = TN_FuncionarioSeguimiento;
        this.TF_FechaSeguimiento = '';
    }
}

