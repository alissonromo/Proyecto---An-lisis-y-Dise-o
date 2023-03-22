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
    public class BusinessReporte
    {
        private DataReporte dataReporte;
        public BusinessReporte()
        {
            dataReporte = new DataReporte();
        }

         public async Task<List<ReporteDatos>> listarReporte(string nombreRol, int idUsuario, string nombreOficina)
        {
                return await dataReporte.listarReporte(nombreRol,idUsuario, nombreOficina);
        }

        public async Task<String> registarReporte(ReporteDatos reporteDatos)
        {
            return await dataReporte.registarReporte(reporteDatos);
        }

        public async Task<List<ReporteDatos>> buscarReporte(string param, string nombreRol, int idUsuario, string nombreOficina)
        {
            return await dataReporte.buscarReporte(param, nombreRol, idUsuario, nombreOficina);
        }

        public async Task<String> modificarReporte(ReporteDatos reporteDatos)
        {
            return await dataReporte.modificarReporte(reporteDatos);
        }

        public async Task<String> eliminarReporte(Reporte reporte)
        {
            return await dataReporte.eliminarReporte(reporte);
        }

        public async Task<List<MisReportes>> MisReportes(int idUsuario)
        {
            return await dataReporte.MisReportes(idUsuario);
        }
        public async Task<List<MisReportesSeguimientos>> MisReportesSeguimientos(int idReporte)
        {
            return await dataReporte.MisReportesSeguimientos(idReporte);
        }
        public async Task<List<MisReportes>> generarHojaTrabajo(int idUsuario, int idEdificio, int idUsuarioActual)
        {
            return await dataReporte.generarHojaTrabajo(idUsuario,idEdificio,idUsuarioActual);
        }

        public async Task<List<ReporteDatos>> consultarAveria(DateTime fechaInicial, DateTime fechaFinal)
        {
            return await dataReporte.consultarAveria(fechaInicial, fechaFinal);
        }

    }
}
