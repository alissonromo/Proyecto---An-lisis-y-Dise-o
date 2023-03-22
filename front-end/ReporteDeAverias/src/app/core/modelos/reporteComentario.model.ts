export interface ComentarioDatos {
    ReporteId: number;
    UsuarioId: number;
    NombreEstado: string;
    NombreUsuario: string;
    Comentario: string;
    FechaInicio: string;
}

export interface ReporteComentario {
    TN_ReporteId: number;
    TN_UsuarioId: number;
    TC_Comentario: string;
    TB_Publico: boolean;
}

export class ReporteComentario implements ReporteComentario {

    constructor(TN_ReporteId: number, TN_UsuarioId: number, TC_Comentario: string, TB_Publico: boolean) {
        this.TN_ReporteId = TN_ReporteId;
        this.TN_UsuarioId = TN_UsuarioId;
        this.TC_Comentario = TC_Comentario;
        this.TB_Publico = TB_Publico;
    }
}