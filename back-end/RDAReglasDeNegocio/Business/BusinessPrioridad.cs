using Microsoft.EntityFrameworkCore;
using RDAAccesoADatos.Context;
using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessPrioridad
    {
        private DataPrioridad dataPrioridad;

        public BusinessPrioridad()
        {
            dataPrioridad = new DataPrioridad();
        }
        public async Task<List<Prioridad>> listarPrioridad()
        {
            return await dataPrioridad.listarPrioridad();
        }

        public async Task<String> registarPrioridad(Prioridad prioridad)
        {
            return await dataPrioridad.registarPrioridad(prioridad);
        }

        public async Task<List<Prioridad>> buscarPrioridad(string nombre)
        {
           return await dataPrioridad.buscarPrioridad(nombre);
        }

        public async Task<String> modificarPrioridad(Prioridad prioridad)
        {
            return await dataPrioridad.modificarPrioridad(prioridad);
        }

        public async Task<String> eliminarPrioridad(Prioridad prioridad)
        {
            return await dataPrioridad.eliminarPrioridad(prioridad);
        }

     }
}
