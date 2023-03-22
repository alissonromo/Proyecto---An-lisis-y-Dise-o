using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessReporteComentario
    {
        private DataReporteComentario dataReporteComentario;

        public BusinessReporteComentario()
        {
            dataReporteComentario = new DataReporteComentario();
        }

        public async Task<List<ComentarioDatos>> listarComentarios(int idUsuario, int idReporte)
        {
            return await dataReporteComentario.listarComentarios(idUsuario,idReporte);
        }

        public async Task<String> eliminarComentario(ReporteComentario comentario)
        {
            return await dataReporteComentario.eliminarComentario(comentario);
        }

        public async Task<List<ComentarioDatos>> buscarComentarios(string param, int idUsuario, int idReporte)
        {
            return await dataReporteComentario.buscarComentarios(param, idUsuario, idReporte);
        }

        public async Task<String> modificarComentario(ReporteComentario comentario)
        {
            return await dataReporteComentario.modificarComentario(comentario);
        }

    }
}
