using System.ComponentModel.DataAnnotations;

namespace RDAEntidades.Entities
{
    public class Rol
    {
        [Key]
        public int? TN_ID { get; set; }
        public string? TC_Nombre { get; set; }

    }
}
