using Microsoft.AspNetCore.Mvc;
using RDAEntidades.Entities;
using RDAReglasDeNegocio.Business;

namespace ReporteDeAverias.Controllers
{
    public class TipoIdentificacionController
    {
        public IConfiguration Configuration { get; }

        public TipoIdentificacionController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        [Route("listarTiposIdentificacion")]
        public async Task<List<TipoIdentificacion>> listarTiposIdentificacion()
        {
            return await (new BusinessTipoIdentificacion().listarTiposIdentificacion());
        }
    }
}
