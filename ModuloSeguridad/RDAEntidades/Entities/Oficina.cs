using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAEntidades.Entities
{
    public class Oficina
    {
        [Key]
        public int? TN_ID { get; set; }
        public int? TN_EdificioId { get; set; }
        public string? TC_Codigo { get; set; }
        public string? TC_Nombre { get; set; }
        
    }

    public class ListaOficina
    {
        [Key]
        public int? ID { get; set; }
        public int? EdificioId { get; set; }
        public string? Edificio { get; set; }
        public string? Codigo { get; set; }
        public string? Nombre { get; set; }

    }
}
