using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.SymbolStore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAEntidades.Entities
{
    public class Usuario
    {
        [Key]
        public int? TN_ID { get; set; }
        public int TN_CantidadIntentosAcceso { get; set; }
        public int? TN_TipoIdentificacionId { get; set; }
       // public int? TN_Rolld { get; set; }
        public string? TC_Identificacion { get; set; }
        public string? TC_Usuario { get; set; }
        public string? TC_Contrasenna { get; set; }
        public string? TC_Nombre { get; set; }
        public string? TC_PrimerApellido { get; set; }
        public string? TC_SegundoApellido { get; set; }
        public string? TC_Correo { get; set; }
        public string? TC_UsuarioActuailiza { get; set; }
        public string? TC_Observaciones { get; set; }
        public DateTime? TF_FechaActualiza { get; set; }
        public bool? TB_Activo { get; set; }

    }

    public class UsuarioDatos
    {
        [Key]
        public int? ID { get; set; }
        public string? Rol { get; set; }
        public string? Nombre { get; set; }
        public string? PrimerApellido { get; set; }
        public string? SegundoApellido { get; set; }
        public int? TipoIdentificacionId { get; set; }
        public string? Identificacion { get; set; }
        public string? Usuario { get; set; }
        public string? Contrasenna { get; set; }
        public string? Correo { get; set; }
        public string? UsuarioActuailiza { get; set; }
        public string? Observaciones { get; set; }
        public DateTime? FechaActualiza { get; set; }
        public int? OficinaId { get; set; }
        public int? RolId { get; set; }
    }

    public class UsuarioRolOficina
    {
        [Key, Column(Order = 1)]
        public int? TN_UsuarioId { get; set; }
        [Key, Column(Order = 2)]
        public int? TN_OficinaId { get; set; }
        [Key, Column(Order = 3)]
        public int? TN_RolId { get; set; }

    }
}
