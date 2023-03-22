using Microsoft.EntityFrameworkCore;
using RDAAccesoADatos.Context;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAAccesoADatos.Data
{
    public class DataTipoIdentificacion
    {
        public async Task<List<TipoIdentificacion>> listarTiposIdentificacion()
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_TipoIdentificacion.ToListAsync();
            }
        }
    }
}
