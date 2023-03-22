using Microsoft.AspNetCore.Mvc;
using RDAReglasDeNegocio.Business;
using RDAEntidades.Entities;
using RDAAccesoADatos.Context;
using RDAAccesoADatos.Data;

namespace ReporteDeAverias.Controllers
{
    public class EdificioController : Controller
    {
       public IConfiguration Configuration { get; }

        public EdificioController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpPost]
        [Route("registarEdificio")]
        public async Task<String> registarEdificio(Edificio edificio)
        {
            return await (new BusinessEdificio().registarEdificio(edificio));
        }

        [HttpGet]
        [Route("listarEdificio")]
        public async Task<List<Edificio>> listarEdificio()
        {
                return await (new BusinessEdificio().listarEdificio());
        }

        [HttpPost]
        [Route("buscarEdificio")]
        public async Task<List<Edificio>> buscarEdificio(string nombre)
        {
            return await (new BusinessEdificio().buscarEdificio(nombre));
        }

        [HttpPost]
        [Route("modificarEdificio")]
        public async Task<String> modificarEdificio(Edificio edificio)
        {
            return await (new BusinessEdificio().modificarEdificio(edificio));
        }

        [HttpPost]
        [Route("eliminarEdificio")]
        public async Task<String> eliminarEdificio(Edificio edificio)
        {
            return await (new BusinessEdificio().eliminarEdificio(edificio));
        }

    }
}
