using Microsoft.AspNetCore.Mvc;
using RDAReglasDeNegocio.Business;
using RDAEntidades.Entities;
using RDAAccesoADatos.Data;

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
        [Route("registarUsuario")]
        public async Task<String> registarUsuario(UsuarioDatos usuarioDatos, string nombreOficina)
        {
            return await (new BusinessUsuario().registarUsuario(usuarioDatos, nombreOficina));
        }

        [HttpGet]
        [Route("listarUsuario")]
        public async Task<List<UsuarioDatos>> listarUsuario()
        {
            return await (new BusinessUsuario().listarUsuario());
        }

        [HttpPost]
        [Route("buscarUsuario")]
        public async Task<List<UsuarioDatos>> buscarUsuario(string param)
        {
            return await (new BusinessUsuario().buscarUsuario(param));
        }

        [HttpPost]
        [Route("modificarUsuario")]
        public async Task<String> modificarUsuario(UsuarioDatos usuarioDatos)
        {
            return await (new BusinessUsuario().modificarUsuario(usuarioDatos));
        }

        [HttpPost]
        [Route("eliminarUsuario")]
        public async Task<String> eliminarUsuario(Usuario usuario, int idOficina, int idRol)
        {
            return await (new BusinessUsuario().eliminarUsuario(usuario,idOficina,idRol));
        }

        [HttpPost]
        [Route("asignarTecnico")]
        public async Task<String> asignarTecnico(int numReporte, List<int> idUsuarios, int idUsuarioActual) //Se asigna uno por uno
        {
            return await (new BusinessUsuario().asignarTecnico(numReporte,idUsuarios, idUsuarioActual));
        }

        [HttpPost]
        [Route("asignarEdificios")]
        public async Task<String> asignarEdificios(List<int> idEdificios) //Se asigna uno por uno
        {
            return await (new BusinessUsuario().asignarEdificios(idEdificios));
        }

        [HttpPost]
        [Route("asignarRolOficina")]
        public async Task<String> asignarRolOficina(List<int> idRol, List<int> idOficinas) //Se asigna uno por uno
        {
            return await (new BusinessUsuario().asignarRolOficina(idRol,idOficinas));
        }

        [HttpPost]
        [Route("buscarUsuarioPorRol")]
        public async Task<List<UsuarioDatos>> buscarUsuarioPorRol(string param)
        {
            return await (new BusinessUsuario().buscarUsuarioPorRol(param));
        }
    }
}
