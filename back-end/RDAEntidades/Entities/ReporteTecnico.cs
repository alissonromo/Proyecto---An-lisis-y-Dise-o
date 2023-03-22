using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Emit;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace RDAEntidades.Entities
{
    public class ReporteTecnico
    {
        public int? TN_ReporteId { get; set; }
        public int? TN_UsuarioId { get; set; }
        public int? TN_CantidadTareas { get; set; }
        public int? TN_MontoMateriales { get; set; }
        public int? TN_Horas { get; set; }
        public int? TN_Minutos { get; set; }
        public int? TN_FuncionarioSeguimiento { get; set; }
        public DateTime TF_FechaSeguimiento { get; set; }
    }

    public class ReporteTecnicoPorFecha
    {

        [Key]
        public int? Anio { get; set; }
        public string? Mes { get; set; }
        public string? NombreUsuario { get; set; }
        public int? Cantidad { get; set; }

    }

}
