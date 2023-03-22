using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAEntidades.Entities
{
    public  class Rol
    {
        [Key]
        public int? TN_ID { get; set; }
        public string? TC_Nombre { get; set; }


    }
}
