using Microsoft.AspNetCore.Mvc;
using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using RDAReglasDeNegocio.Business;

namespace ReporteDeAverias.Controllers
{
    public class PrioridadController : Controller
    {
        public IConfiguration Configuration { get; }

        public PrioridadController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        [HttpGet]
        [Route("listarPrioridad")]
        public async Task<List<Prioridad>> listarPrioridad()
        {
            return await (new BusinessPrioridad().listarPrioridad());
        }
        [HttpPost]
        [Route("registarPrioridad")]
        public async Task<String> registarPrioridad(Prioridad prioridad)
        {
            return await (new BusinessPrioridad().registarPrioridad(prioridad));
        }
        [HttpPost]
        [Route("buscarPrioridad")]
        public async Task<List<Prioridad>> buscarPrioridad(string nombre)
        {
            return await (new BusinessPrioridad().buscarPrioridad(nombre));
        }
        [HttpPost]
        [Route("modificarPrioridad")]
        public async Task<String> modificarPrioridad(Prioridad prioridad)
        {
            return await (new BusinessPrioridad().modificarPrioridad(prioridad));
        }
        [HttpPost]
        [Route("eliminarPrioridad")]
        public async Task<String> eliminarPrioridad(Prioridad prioridad)
        {
            return await (new BusinessPrioridad().eliminarPrioridad(prioridad));
        }
    }
}
