using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessOficina
    {
        private DataOficina dataOficina;

        public BusinessOficina()
        {
            dataOficina = new DataOficina();
        }

        public async Task<List<ListaOficina>> listarOficina()
        {
            return await dataOficina.listarOficina();
        }
        public async Task<List<ListaOficina>> listarOficinaPorEdificio(Edificio edificio)
        {
            return await dataOficina.listarOficinaPorEdificio(edificio);        
        }


        }
}
