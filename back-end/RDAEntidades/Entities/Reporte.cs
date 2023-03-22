using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAEntidades.Entities
{
    public class Reporte
    {

        [Key]
        public int TN_ID { get; set; }
        public int TN_UsuarioId { get; set; }   
        public int TN_EdificioId { get; set; }
        public int TN_OficinaId { get; set; }
        public int TN_EstadoId { get; set; }
        public int TN_TipoId { get; set; }
        public int TN_PrioridadId { get; set; }
        public string? TC_Descripcion { get; set; }
        public DateTime? TF_FechaInicio { get; set; }
        public DateTime? TF_FechaFinal { get; set; }

    }

    public class ReporteDatos
    {

        [Key]
        public int? ID { get; set; }
        public int? UsuarioId { get; set; }
        public string? Usuario { get; set; }
        public int? EdificioId { get; set; }
        public string? Edificio { get; set; }
        public int? OficinaId { get; set; }
        public string? Oficina { get; set; }
        public int? EstadoId { get; set; }
        public string? Estado { get; set; }
        public int? TipoId { get; set; }
        public string? Tipo { get; set; }
        public int? PrioridadId { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? FechaInicio { get; set; }

    }

    public class MisReportes
    {

        [Key]
        public int ID { get; set; }
        public int? UsuarioId { get; set; }
        public string? Usuario { get; set; }
        public int? EdificioId { get; set; }
        public string? Edificio { get; set; }
        public int? OficinaId { get; set; }
        public string? Oficina { get; set; }
        public int? EstadoId { get; set; }
        public string? Estado { get; set; }
        public int? TipoId { get; set; }
        public string? Tipo { get; set; }
        public int? PrioridadId { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public string? Comentario { get; set; }

        // Seguimiento
        public DateTime? FechaSeguimiento { get; set; }
        public int? UsuarioAsignadoId { get; set; }
        public string? UsuarioAsignado { get; set; }
        public int? UsuarioSeguimientoId { get; set; }
        public string? UsuarioSeguimiento { get; set; }

    }

    public class MisReportesSeguimientos
    {

        [Key]
        public int? ReporteId { get; set; }
        public int? UsuarioId { get; set; }
        public DateTime? FechaSeguimiento { get; set; }
        public int? UsuarioAsignadoId { get; set; }
        public string? UsuarioAsignado { get; set; }
        public int? UsuarioSeguimientoId { get; set; }
        public string? UsuarioSeguimiento { get; set; }


    }

}
