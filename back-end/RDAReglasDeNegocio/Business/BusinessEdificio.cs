using RDAAccesoADatos.Context;
using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessEdificio
    {
        private DataEdificio dataEdificio;

        public BusinessEdificio()
        {
            dataEdificio = new DataEdificio();
        }

        public async Task<String> registarEdificio(Edificio edificio)
        {
            return await dataEdificio.registarEdificio(edificio);
        }

        public async Task<List<Edificio>> listarEdificio()
        {
                return await dataEdificio.listarEdificio();
        }

        public async Task<List<Edificio>> buscarEdificio(string nombre)
        {
            return await dataEdificio.buscarEdificio(nombre);
        }

        public async Task<String> modificarEdificio(Edificio edificio)
        {
            return await dataEdificio.modificarEdificio(edificio);
        }

        public async Task<String> eliminarEdificio(Edificio edificio)
        {
            return await dataEdificio.eliminarEdificio(edificio);
        }


    }
}
