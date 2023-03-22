using Microsoft.AspNetCore.Mvc;
using RDAReglasDeNegocio.Business;
using RDAEntidades.Entities;

namespace ReporteDeAverias.Controllers
{
    public class UsuarioController : Controller
    {
        public IConfiguration Configuration { get; }
        public UsuarioController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpPost]
        [Route("buscarUsuario")]
        public async Task<Login> buscarUsuario(string usuario, string contrasenna)
        {
            return await (new BusinessUsuario().buscarUsuario(usuario, contrasenna));
        }

        [HttpPost]
        [Route("buscarUsuarioRol")]
        public async Task<Rol> buscarUsuarioRol(string nombreOficina, int usuarioId)
        {
            return await (new BusinessUsuario().buscarUsuarioRol(nombreOficina, usuarioId));
        }

    }
}
