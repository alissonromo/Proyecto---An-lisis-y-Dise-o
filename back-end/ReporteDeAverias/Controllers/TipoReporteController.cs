using Microsoft.AspNetCore.Mvc;
using RDAReglasDeNegocio.Business;
using RDAEntidades.Entities;
using RDAAccesoADatos.Context;
using RDAAccesoADatos.Data;

namespace ReporteDeAverias.Controllers
{
    public class TipoReporteConroller : Controller
    {
        public IConfiguration Configuration { get; }

        public TipoReporteConroller(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpPost]
        [Route("registarTipoReporte")]
        public async Task<String> registarTipoReporte(TipoReporte tipoReporte)
        {
            return await (new BusinessTipoReporte().registarTipoReporte(tipoReporte));
        }


        [HttpGet]
        [Route("listarTipoReporte")]
        public async Task<List<TipoReporte>> listarTipoReporte()
        {
            return await (new BusinessTipoReporte().listarTipoReporte());
        }

        [HttpPost]
        [Route("buscarTipoReporte")]
        public async Task<List<TipoReporte>> buscarTipoReporte(string nombre)
        {
            return await (new BusinessTipoReporte().buscarTipoReporte(nombre));
        }

        [HttpPost]
        [Route("modificarTipoReporte")]
        public async Task<String> modificarTipoReporte(TipoReporte tipoReporte)
        {
            return await (new BusinessTipoReporte().modificarTipoReporte(tipoReporte));
        }

        [HttpPost]
        [Route("eliminarTipoReporte")]
        public async Task<String> eliminarTipoReporte(TipoReporte tipoReporte)
        {
            return await (new BusinessTipoReporte().eliminarTipoReporte(tipoReporte));
        }

    }
}
