using Microsoft.AspNetCore.Mvc;
using RDAEntidades.Entities;
using RDAReglasDeNegocio.Business;

namespace ReporteDeAverias.Controllers
{
    public class EstadoReporteController : Controller
    {
        public IConfiguration Configuration { get; }

        public EstadoReporteController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        [Route("listarEstadoReporte")]
        public async Task<List<EstadoReporte>> listarEstadoReporte()
        {
            return await (new BusinessEstadoReporte().listarEstadoReporte());
        }

        [HttpPost]
        [Route("registarEstadoReporte")]
        public async Task<String> registarEstadoReporte(EstadoReporte estadoReporte)
        {
            return await (new BusinessEstadoReporte().registarEstadoReporte(estadoReporte));
        }

        [HttpPost]
        [Route("buscarEstadoReporte")]
        public async Task<List<EstadoReporte>> buscarEstadoReporte(string nombre)
        {
            return await (new BusinessEstadoReporte().buscarEstadoReporte(nombre));
        }

        [HttpPost]
        [Route("modificarEstadoReporte")]
        public async Task<String> modificarEstadoReporte(EstadoReporte estadoReporte)
        {
            return await (new BusinessEstadoReporte().modificarEstadoReporte(estadoReporte));
        }

        [HttpPost]
        [Route("eliminarEstadoReporte")]
        public async Task<String> eliminarEstadoReporte(EstadoReporte estadoReporte)
        {
            return await (new BusinessEstadoReporte().eliminarEstadoReporte(estadoReporte));
        }
        
    }
}
