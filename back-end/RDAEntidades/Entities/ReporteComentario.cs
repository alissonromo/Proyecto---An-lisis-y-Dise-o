using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAEntidades.Entities
{
    public class ReporteComentario
    {
        [Key]
        public int? TN_ReporteId { get; set; }
        public int? TN_UsuarioId { get; set; }
        public string? TC_Comentario { get; set; }
        public bool? TB_Publico { get; set; }
    }

    public class ComentarioDatos
    {

        [Key]
        public int? ReporteId { get; set; }
        public int? UsuarioId { get; set; }
        public string? NombreEstado { get; set; }
        public string? NombreUsuario { get; set; }
        public string? Comentario { get; set; }
        public DateTime? FechaInicio { get; set; }

    }
}
