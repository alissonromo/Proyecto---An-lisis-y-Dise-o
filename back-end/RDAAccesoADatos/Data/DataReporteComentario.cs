using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using RDAAccesoADatos.Context;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAAccesoADatos.Data
{
    public class DataReporteComentario
    {
        public async Task<List<ComentarioDatos>> listarComentarios(int idUsuario, int idReporte)
        {
            using (var _context = new BDContext())
            {
                var comentarioLista2 =   (from r in _context.TReporteDeAverias_Reporte
                                            join u in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals u.TN_ID
                                          join rc in _context.TReporteDeAverias_ReporteComentario on r.TN_ID equals rc.TN_ReporteId
                                          join e in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals e.TN_ID
                                          join rt in _context.TReporteDeAverias_ReporteTecnico on r.TN_ID equals rt.TN_ReporteId into rtT
                                          from x in rtT.DefaultIfEmpty()
                                          join u2 in _context.TReporteDeAverias_UsuarioAcceso on x.TN_UsuarioId equals u2.TN_ID
                                          where r.TN_ID == idReporte
                                          select new ComentarioDatos 
                                            {
                                               ReporteId = r.TN_ID,
                                               NombreUsuario = (x.TN_CantidadTareas == null && x.TN_MontoMateriales == null) ? u2.TC_Nombre + " " + u2.TC_PrimerApellido + " " + u2.TC_SegundoApellido :
                                               (x.TN_CantidadTareas != null && x.TN_MontoMateriales != null) ? u.TC_Nombre + " " + u.TC_PrimerApellido + " " + u.TC_SegundoApellido : " ",

                                              FechaInicio =  (x.TN_CantidadTareas == null && x.TN_MontoMateriales == null) ? r.TF_FechaInicio :
                                               (x.TN_CantidadTareas != null && x.TN_MontoMateriales != null) ? x.TF_FechaSeguimiento : r.TF_FechaInicio,
                                              NombreEstado = e.TC_Nombre,
                                               Comentario = (rc.TB_Publico == false && rc.TN_UsuarioId==idUsuario) ? rc.TC_Comentario : 
                                               (rc.TB_Publico == false && rc.TN_UsuarioId != idUsuario) ? "Comentario Privado": rc.TC_Comentario
                                            }
                                             );

               
                    return await comentarioLista2.ToListAsync();
                
            }
        }

        public async Task<String> eliminarComentario(ReporteComentario comentario) 
        {
            using (var _context = new BDContext())
            {
                try
                {
                    _context.TReporteDeAverias_ReporteComentario.Remove(comentario);
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se puede eliminar. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
                }
                return "Comentario Eliminado";
            }
        }

        public async Task<List<ComentarioDatos>> buscarComentarios(string param, int idUsuario, int idReporte)
        {
            using (var _context = new BDContext())
            {
                var comentarioLista = await (from r in _context.TReporteDeAverias_Reporte
                                             join u in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals u.TN_ID
                                             join rc in _context.TReporteDeAverias_ReporteComentario on r.TN_ID equals rc.TN_ReporteId
                                             join e in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals e.TN_ID
                                             join rt in _context.TReporteDeAverias_ReporteTecnico on r.TN_ID equals rt.TN_ReporteId into rtT
                                             from x in rtT.DefaultIfEmpty()
                                             join u2 in _context.TReporteDeAverias_UsuarioAcceso on x.TN_UsuarioId equals u2.TN_ID
                                             where r.TN_ID == idReporte && (e.TC_Nombre.Contains(param) || u.TC_Nombre.Contains(param)
                                             || u.TC_PrimerApellido.Contains(param) || u.TC_SegundoApellido.Contains(param)
                                             || u2.TC_Nombre.Contains(param)|| u2.TC_PrimerApellido.Contains(param) || u2.TC_SegundoApellido.Contains(param)
                                             || rc.TC_Comentario.Contains(param))
                                             select new ComentarioDatos
                                             {
                                                 ReporteId = r.TN_ID,
                                                 NombreUsuario = (x.TN_CantidadTareas == null && x.TN_MontoMateriales == null) ? u2.TC_Nombre + " " + u2.TC_PrimerApellido + " " + u2.TC_SegundoApellido :
                                               (x.TN_CantidadTareas != null && x.TN_MontoMateriales != null) ? u.TC_Nombre + " " + u.TC_PrimerApellido + " " + u.TC_SegundoApellido : " ",

                                                 FechaInicio = (x.TN_CantidadTareas == null && x.TN_MontoMateriales == null) ? r.TF_FechaInicio :
                                               (x.TN_CantidadTareas != null && x.TN_MontoMateriales != null) ? x.TF_FechaSeguimiento : r.TF_FechaInicio,
                                                 NombreEstado = e.TC_Nombre,
                                                 Comentario = (rc.TB_Publico == false && rc.TN_UsuarioId == idUsuario) ? rc.TC_Comentario :
                                               (rc.TB_Publico == false && rc.TN_UsuarioId != idUsuario) ? "Comentario Privado" : rc.TC_Comentario
                                             }).ToListAsync();


                return comentarioLista;
            }
        }

        public async Task<String> modificarComentario(ReporteComentario comentario)
        {

            try
            {
                using (var _context = new BDContext())
                {
                    var author = _context.TReporteDeAverias_ReporteComentario.First(x => x.TN_ReporteId == comentario.TN_ReporteId); 
                    if (comentario.TC_Comentario!=null) {
                        author.TN_UsuarioId = comentario.TN_UsuarioId;
                        author.TC_Comentario = comentario.TC_Comentario;
                        author.TB_Publico = comentario.TB_Publico;
                    }
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Comentario Actualizado";

        }
    }
}
