using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessEstadoReporte
    {
        private DataEstadoReporte dataEstadoReporte;

        public BusinessEstadoReporte()
        {
            dataEstadoReporte = new DataEstadoReporte();
        }

        public async Task<List<EstadoReporte>> listarEstadoReporte()
        {
            return await dataEstadoReporte.listarEstadoReporte();
        }
        public async Task<String> registarEstadoReporte(EstadoReporte estadoReporte)
        {
            return await dataEstadoReporte.registarEstadoReporte(estadoReporte);
        }
        public async Task<List<EstadoReporte>> buscarEstadoReporte(string nombre)
        { 
            return await dataEstadoReporte.buscarEstadoReporte(nombre);
        }
        public async Task<String> modificarEstadoReporte(EstadoReporte estadoReporte)
        {
            return await dataEstadoReporte.modificarEstadoReporte(estadoReporte);
        }
        public async Task<String> eliminarEstadoReporte(EstadoReporte estadoReporte)
        {
            return await dataEstadoReporte.eliminarEstadoReporte(estadoReporte);
        }

        }
}
