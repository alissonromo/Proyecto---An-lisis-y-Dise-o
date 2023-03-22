using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessTipoIdentificacion
    {
        private DataTipoIdentificacion dataTipoIdentificacion;

        public BusinessTipoIdentificacion()
        {
            dataTipoIdentificacion = new DataTipoIdentificacion();
        }
        public async Task<List<TipoIdentificacion>> listarTiposIdentificacion()
        {
            return await dataTipoIdentificacion.listarTiposIdentificacion();
        }
        
    }
}
