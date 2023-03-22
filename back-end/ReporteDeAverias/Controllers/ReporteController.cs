using Microsoft.AspNetCore.Mvc;
using RDAReglasDeNegocio.Business;
using RDAEntidades.Entities;
using RDAAccesoADatos.Context;
using RDAAccesoADatos.Data;

namespace ReporteDeAverias.Controllers
{
    public class ReporteController : Controller
    {
        public IConfiguration Configuration { get; }

        public ReporteController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpPost]
        [Route("registarReporte")]
        public async Task<String> registarReporte(ReporteDatos reporteDatos)
        {
            return await (new BusinessReporte().registarReporte(reporteDatos));
        }

        [HttpPost]
        [Route("listarReporte")]
        public async Task<List<ReporteDatos>> listarReporte(string nombreRol, int idUsuario, string nombreOficina)
        {
            return await (new BusinessReporte().listarReporte(nombreRol,idUsuario, nombreOficina));
        }

        [HttpPost]
        [Route("buscarReporte")]
        public async Task<List<ReporteDatos>> buscarReporte(string param, string nombreRol, int idUsuario, string nombreOficina)
        {
            return await (new BusinessReporte().buscarReporte(param, nombreRol,idUsuario,nombreOficina));
        }

        [HttpPost]
        [Route("modificarReporte")]
        public async Task<String> modificarReporte(ReporteDatos reporteDatos)
        {
            return await (new BusinessReporte().modificarReporte(reporteDatos));
        }

        [HttpPost]
        [Route("eliminarReporte")]
        public async Task<String> eliminarReporte(Reporte reporte)
        {
            return await (new BusinessReporte().eliminarReporte(reporte));
        }

        [HttpPost]
        [Route("MisReportes")]
        public async Task<List<MisReportes>> MisReportes(int idUsuario)
        {
            return await (new BusinessReporte().MisReportes(idUsuario));
        }

        [HttpPost]
        [Route("MisReportesSeguimientos")]
        public async Task<List<MisReportesSeguimientos>> MisReportesSeguimientos(int idReporte)
        {
            return await (new BusinessReporte().MisReportesSeguimientos(idReporte));
        }


        [HttpPost]
        [Route("generarHojaTrabajo")]
        public async Task<List<MisReportes>> generarHojaTrabajo(int idUsuario, int idEdificio, int idUsuarioActual)
        {
            return await (new BusinessReporte().generarHojaTrabajo(idUsuario,idEdificio,idUsuarioActual));
        }

        [HttpPost]
        [Route("consultarAveria")]
        public async Task<List<ReporteDatos>> consultarAveria(DateTime fechaInicial, DateTime fechaFinal)
        {
            return await (new BusinessReporte().consultarAveria(fechaInicial, fechaFinal));
        }

    }
}

