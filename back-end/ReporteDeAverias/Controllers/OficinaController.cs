using Microsoft.AspNetCore.Mvc;
using RDAEntidades.Entities;
using RDAReglasDeNegocio.Business;

namespace ReporteDeAverias.Controllers
{
    public class OficinaController : Controller
    {
        public IConfiguration Configuration { get; }

        public OficinaController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        [Route("listarOficina")]
        public async Task<List<ListaOficina>> listarOficina()
        {
            return await (new BusinessOficina().listarOficina());
        }

        [HttpPost]
        [Route("listarOficinaPorEdificio")]
        public async Task<List<ListaOficina>> listarOficinaPorEdificio(Edificio edificio)
        {
            return await (new BusinessOficina().listarOficinaPorEdificio(edificio));
        }

        }
}
