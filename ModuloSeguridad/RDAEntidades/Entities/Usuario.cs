using System.ComponentModel.DataAnnotations;

namespace RDAEntidades.Entities
{
    public class Usuario
    {
        [Key]
        public int? TN_ID { get; set; } = null;
        public int TN_CantidadIntentosAcceso { get; set; }
        public int TN_TipoIdentificacionId { get; set; }
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
    public class Login
    {
        [Key]
        public int? ID { get; set; }

        public string? Usuario { get; set; }

        public string? Contrasenna { get; set; }
    }

    public class UsuarioRolOficina
    {
        public int? TN_UsuarioId { get; set; }
        public int? TN_OficinaId { get; set; }
        public int? TN_RolId { get; set; }

    }
}