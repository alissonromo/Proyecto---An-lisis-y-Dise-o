using Microsoft.AspNetCore.Mvc;
using RDAEntidades.Entities;
using RDAReglasDeNegocio.Business;

namespace ReporteDeAverias.Controllers
{
    public class ReporteComentarioController : Controller
    {
        public IConfiguration Configuration { get; }

        public ReporteComentarioController(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        [HttpPost]
        [Route("listarComentarios")]
        public async Task<List<ComentarioDatos>> listarComentarios(int idUsuario, int idReporte)
        {
            return await (new BusinessReporteComentario().listarComentarios(idUsuario, idReporte));
        }

        [HttpPost]
        [Route("eliminarComentario")]
        public async Task<String> eliminarComentario(ReporteComentario comentario)
        {
            return await (new BusinessReporteComentario().eliminarComentario(comentario));
        }

        [HttpPost]
        [Route("buscarComentarios")]
        public async Task<List<ComentarioDatos>> buscarComentarios(string param, int idUsuario, int idReporte)
        {
            return await (new BusinessReporteComentario().buscarComentarios(param,idUsuario,idReporte));
        }

        [HttpPost]
        [Route("modificarComentario")]
        public async Task<String> modificarComentario(ReporteComentario comentario)
        {
            return await (new BusinessReporteComentario().modificarComentario(comentario));
        }

    }
}
