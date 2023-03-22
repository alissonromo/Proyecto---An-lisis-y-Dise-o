using RDAEntidades.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using RDAAccesoADatos.Context;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace RDAAccesoADatos.Data
{
    public class DataReporte
    {
        public async Task<List<ReporteDatos>> listarReporte(string nombreRol, int idUsuario, string nombreOficina)
        {
            using (var _context = new BDContext())
            {

                var getRolId = (from r in _context.TReporteDeAverias_Rol
                                where r.TC_Nombre == nombreRol
                                select r.TN_ID).First(); ;

                var getOficinaId = (from o in _context.TReporteDeAverias_Oficina
                                    where o.TC_Nombre == nombreOficina
                                    select o.TN_ID).First(); ;

                var getEdificioId = (from o in _context.TReporteDeAverias_Oficina
                                     where o.TN_ID == getOficinaId
                                     select o.TN_EdificioId).First(); ;

                var reporteLista = new List<ReporteDatos>();


                if (getRolId != 2)
                {
                    reporteLista = await (from r in _context.TReporteDeAverias_Reporte
                                          join ua in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals ua.TN_ID
                                          join tr in _context.TReporteDeAverias_TipoReporte on r.TN_TipoId equals tr.TN_ID
                                          join e in _context.TReporteDeAverias_Edificio on r.TN_EdificioId equals e.TN_ID
                                          join o in _context.TReporteDeAverias_Oficina on r.TN_OficinaId equals o.TN_ID
                                          join er in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals er.TN_ID
                                          join p in _context.TReporteDeAverias_Prioridad on r.TN_PrioridadId equals p.TN_ID
                                          where (getRolId == 1) ||
                                          (getRolId == 3 && (r.TN_EstadoId == 14 || r.TN_EstadoId == 8 || r.TN_EstadoId == 12)) ||
                                          (getRolId == 4 && r.TN_UsuarioId == idUsuario) ||
                                          (getRolId == 5 && (r.TN_EstadoId == 1 || r.TN_EstadoId == 8 || r.TN_EstadoId == 12) && r.TN_EdificioId == getEdificioId)
                                          select new ReporteDatos
                                          {
                                              ID = r.TN_ID,
                                              UsuarioId = ua.TN_ID,
                                              EdificioId = e.TN_ID,
                                              OficinaId = o.TN_ID,
                                              EstadoId = er.TN_ID,
                                              TipoId = tr.TN_ID,
                                              PrioridadId = p.TN_ID,
                                              Prioridad = p.TC_Nombre,
                                              Tipo = tr.TC_Nombre,
                                              Descripcion = r.TC_Descripcion,
                                              Edificio = e.TC_Nombre,
                                              Oficina = o.TC_Nombre,
                                              Estado = er.TC_Nombre,
                                              Usuario = ua.TC_Nombre + ' ' + ua.TC_PrimerApellido + ' ' + ua.TC_SegundoApellido,
                                              FechaInicio = r.TF_FechaInicio
                                          }).ToListAsync();

                    if (getRolId == 3)
                    {
                        
                       reporteLista = reporteLista.OrderByDescending(ReporteDatos => ReporteDatos.EstadoId).ThenByDescending(ReporteDatos => ReporteDatos.FechaInicio).ToList();
                    }
                    else {
                        reporteLista = reporteLista.OrderBy(ReporteDatos => ReporteDatos.EstadoId).ThenByDescending(ReporteDatos => ReporteDatos.FechaInicio).ToList();
                    }
                }
                else
                {
                    reporteLista = await (from r in _context.TReporteDeAverias_Reporte
                                          join ua in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals ua.TN_ID
                                          join tr in _context.TReporteDeAverias_TipoReporte on r.TN_TipoId equals tr.TN_ID
                                          join e in _context.TReporteDeAverias_Edificio on r.TN_EdificioId equals e.TN_ID
                                          join o in _context.TReporteDeAverias_Oficina on r.TN_OficinaId equals o.TN_ID
                                          join er in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals er.TN_ID
                                          join p in _context.TReporteDeAverias_Prioridad on r.TN_PrioridadId equals p.TN_ID
                                          join rt in _context.TReporteDeAverias_ReporteTecnico on r.TN_ID equals rt.TN_ReporteId
                                          where (getRolId == 2 && (r.TN_EstadoId == 12 || r.TN_EstadoId == 13) && rt.TN_UsuarioId == idUsuario)
                                          select new ReporteDatos
                                          {
                                              ID = r.TN_ID,
                                              UsuarioId = ua.TN_ID,
                                              EdificioId = e.TN_ID,
                                              OficinaId = o.TN_ID,
                                              EstadoId = er.TN_ID,
                                              TipoId = tr.TN_ID,
                                              PrioridadId = p.TN_ID,
                                              Prioridad = p.TC_Nombre,
                                              Tipo = tr.TC_Nombre,
                                              Descripcion = r.TC_Descripcion,
                                              Edificio = e.TC_Nombre,
                                              Oficina = o.TC_Nombre,
                                              Estado = er.TC_Nombre,
                                              Usuario = ua.TC_Nombre + ' ' + ua.TC_PrimerApellido + ' ' + ua.TC_SegundoApellido,
                                              FechaInicio = r.TF_FechaInicio
                                          }).ToListAsync();
                }
                return reporteLista;
            }
        }

        public async Task<String> registarReporte(ReporteDatos reporteDatos)
        {
            try
            {
                using (var _context = new BDContext())
                {

                    var getEdificioId = (from e in _context.TReporteDeAverias_Edificio
                                         where e.TC_Nombre == reporteDatos.Edificio
                                         select e.TN_ID).First();

                    var getTipoReporteId = (from tr in _context.TReporteDeAverias_TipoReporte
                                            where tr.TC_Nombre == reporteDatos.Tipo
                                            select tr.TN_ID).First();

                    var getUsuarioId = (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                        where ua.TC_Usuario == reporteDatos.Usuario
                                        select ua.TN_ID).First();

                    var getOficinaId = (from o in _context.TReporteDeAverias_Oficina
                                        where o.TC_Nombre == reporteDatos.Oficina
                                        select o.TN_ID).First();

                    var getEstadoId = (from er in _context.TReporteDeAverias_EstadoReporte
                                       where er.TC_Nombre == reporteDatos.Estado
                                       select er.TN_ID).First();

                    var getPrioridadId = (from p in _context.TReporteDeAverias_Prioridad
                                          where p.TC_Nombre == reporteDatos.Prioridad
                                          select p.TN_ID).First();

                    string date = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");
                    var parseDate = DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.CreateSpecificCulture("es-Es")); //es-Es

                    var reporte = new Reporte();
                    reporte.TN_UsuarioId = (int)getUsuarioId;
                    reporte.TN_EdificioId = (int)getEdificioId;
                    reporte.TN_OficinaId = (int)getOficinaId;
                    reporte.TN_EstadoId = (int)getEstadoId;
                    reporte.TN_TipoId = getTipoReporteId;
                    reporte.TN_PrioridadId = (int)getPrioridadId;
                    reporte.TC_Descripcion = reporteDatos.Descripcion;
                    reporte.TF_FechaInicio = DateTime.Now;
                    reporte.TF_FechaFinal = null;


                    _context.TReporteDeAverias_Reporte.Add(reporte);
                    await _context.SaveChangesAsync();

                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
            }
            return "Reporte Registrado";

        }

        public async Task<List<ReporteDatos>> buscarReporte(string param, string nombreRol, int idUsuario, string nombreOficina)
        {

            using (var _context = new BDContext())
            {
                var getRolId = (from r in _context.TReporteDeAverias_Rol
                                where r.TC_Nombre == nombreRol
                                select r.TN_ID).First(); ;

                var getOficinaId = (from o in _context.TReporteDeAverias_Oficina
                                    where o.TC_Nombre == nombreOficina
                                    select o.TN_ID).First(); ;

                var getEdificioId = (from o in _context.TReporteDeAverias_Oficina
                                     where o.TN_ID == getOficinaId
                                     select o.TN_EdificioId).First(); ;

                var reporteBuscar = await (from r in _context.TReporteDeAverias_Reporte
                                           join tr in _context.TReporteDeAverias_TipoReporte on r.TN_TipoId equals tr.TN_ID
                                           join o in _context.TReporteDeAverias_Oficina on r.TN_OficinaId equals o.TN_ID
                                           join e in _context.TReporteDeAverias_Edificio on r.TN_EdificioId equals e.TN_ID
                                           join p in _context.TReporteDeAverias_Prioridad on r.TN_PrioridadId equals p.TN_ID
                                           join es in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals es.TN_ID
                                           join ua in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals ua.TN_ID
                                           where (r.TC_Descripcion.Contains(param) || ua.TC_Nombre.Contains(param) || ua.TC_PrimerApellido.Contains(param)
                                                 || ua.TC_SegundoApellido.Contains(param) || r.TF_FechaInicio.ToString().Contains(param)
                                                 || e.TC_Nombre.Contains(param) || es.TC_Nombre.Contains(param) || tr.TC_Nombre.Contains(param)
                                                 || o.TC_Nombre.Contains(param) || r.TN_ID.ToString().Contains(param)) && (
                                                 (getRolId == 1) ||
                                                 (getRolId == 2 && (r.TN_EstadoId == 12 || r.TN_EstadoId == 13)) ||
                                                 (getRolId == 3 && (r.TN_EstadoId == 14 || r.TN_EstadoId == 8 || r.TN_EstadoId == 12)) ||
                                                 (getRolId == 4 && r.TN_UsuarioId == idUsuario) ||
                                                 (getRolId == 5 && (r.TN_EstadoId == 1 || r.TN_EstadoId == 8 || r.TN_EstadoId == 12) && r.TN_EdificioId == getEdificioId))
                                           select new ReporteDatos
                                           {
                                               ID = r.TN_ID,
                                               UsuarioId = ua.TN_ID,
                                               EdificioId = e.TN_ID,
                                               OficinaId = o.TN_ID,
                                               EstadoId = es.TN_ID,
                                               TipoId = tr.TN_ID,
                                               PrioridadId = p.TN_ID,
                                               Tipo = tr.TC_Nombre,
                                               Descripcion = r.TC_Descripcion,
                                               Edificio = e.TC_Nombre,
                                               Oficina = o.TC_Nombre,
                                               Prioridad = p.TC_Nombre,
                                               Estado = es.TC_Nombre,
                                               Usuario = ua.TC_Nombre + ' ' + ua.TC_PrimerApellido + ' ' + ua.TC_SegundoApellido,
                                               FechaInicio = r.TF_FechaInicio,
                                           }).ToListAsync();
                return reporteBuscar;
            }
        }

        public async Task<String> modificarReporte(ReporteDatos reporteDatos)
        {

            try
            {
                using (var _context = new BDContext())
                {
                    var reporte = new Reporte();

                    reporte = _context.TReporteDeAverias_Reporte.Find(reporteDatos.ID);

                    if (reporte != null)
                    {
                        var getID = reporteDatos.ID;

                        if (reporteDatos.Descripcion != null)
                        {
                            reporte.TC_Descripcion = reporteDatos.Descripcion;
                        }

                        if (reporteDatos.Tipo != null)
                        {
                            var getTipoId = (from tr in _context.TReporteDeAverias_TipoReporte
                                             where tr.TC_Nombre == reporteDatos.Tipo
                                             select tr.TN_ID).First();

                            reporte.TN_TipoId = getTipoId;
                        }

                        if (reporteDatos.Edificio != null)
                        {
                            var getEdificioiId = (from e in _context.TReporteDeAverias_Edificio
                                                  where e.TC_Nombre == reporteDatos.Edificio
                                                  select e.TN_ID).First();

                            reporte.TN_EdificioId = (int)getEdificioiId;
                        }

                        if (reporteDatos.Oficina != null)
                        {
                            var getOficinaId = (from o in _context.TReporteDeAverias_Oficina
                                                where o.TC_Nombre == reporteDatos.Oficina
                                                select o.TN_ID).First();

                            reporte.TN_OficinaId = (int)getOficinaId;
                        }

                        if (reporteDatos.Estado != null) // 
                        {
                            var getEstadoId = (from er in _context.TReporteDeAverias_EstadoReporte
                                               where er.TC_Nombre == reporteDatos.Estado
                                               select er.TN_ID).First();

                            reporte.TN_EstadoId = (int)getEstadoId;
                        }

                        if (reporteDatos.Prioridad != null)
                        {
                            var getPrioridadId = (from p in _context.TReporteDeAverias_Prioridad
                                                  where p.TC_Nombre == reporteDatos.Prioridad
                                                  select p.TN_ID).First();

                            reporte.TN_PrioridadId = (int)getPrioridadId;
                        }

                        _context.Entry(reporte).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                    }
                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Reporte Actualizado";

        }

        public async Task<String> eliminarReporte(Reporte reporte)
        {
            using (var _context = new BDContext())
            {
                    var comentarioReporte = new ReporteComentario();
                    comentarioReporte=  _context.TReporteDeAverias_ReporteComentario.Find(reporte.TN_ID);
                    _context.TReporteDeAverias_ReporteComentario.Remove(comentarioReporte);
                    await _context.SaveChangesAsync();

                _context.TReporteDeAverias_Reporte.Remove(reporte);
                await _context.SaveChangesAsync();
                return "Reporte Eliminado";
            }
        }

        public async Task<List<MisReportes>> MisReportes(int idUsuario)
        {
            using (var _context = new BDContext())
            {
                var reporteLista = await (from r in _context.TReporteDeAverias_Reporte
                                          join ua in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals ua.TN_ID
                                          join tr in _context.TReporteDeAverias_TipoReporte on r.TN_TipoId equals tr.TN_ID
                                          join e in _context.TReporteDeAverias_Edificio on r.TN_EdificioId equals e.TN_ID
                                          join o in _context.TReporteDeAverias_Oficina on r.TN_OficinaId equals o.TN_ID
                                          join er in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals er.TN_ID
                                          join p in _context.TReporteDeAverias_Prioridad on r.TN_PrioridadId equals p.TN_ID
                                          join c in _context.TReporteDeAverias_ReporteComentario on r.TN_ID equals c.TN_ReporteId
                                          where ua.TN_ID == idUsuario
                                          select new MisReportes
                                          {
                                              Prioridad = p.TC_Nombre,
                                              ID = r.TN_ID,
                                              UsuarioId = ua.TN_ID,
                                              EdificioId = e.TN_ID,
                                              OficinaId = o.TN_ID,
                                              EstadoId = er.TN_ID,
                                              TipoId = tr.TN_ID,
                                              PrioridadId = p.TN_ID,
                                              Tipo = tr.TC_Nombre,
                                              Descripcion = r.TC_Descripcion,
                                              Edificio = e.TC_Nombre,
                                              Oficina = o.TC_Nombre,
                                              Estado = er.TC_Nombre,
                                              Usuario = ua.TC_Nombre + ' ' + ua.TC_PrimerApellido + ' ' + ua.TC_SegundoApellido,
                                              Comentario = c.TC_Comentario,
                                              FechaSeguimiento = r.TF_FechaInicio,
                                              UsuarioAsignadoId = null,
                                              UsuarioAsignado = " ",
                                              UsuarioSeguimientoId = null,
                                              UsuarioSeguimiento = " "
                                          }).ToListAsync();


                var reporteListaSeguimiento = await (from rt in _context.TReporteDeAverias_ReporteTecnico
                                                     join r in _context.TReporteDeAverias_Reporte on rt.TN_ReporteId equals r.TN_ID
                                                     join ua in _context.TReporteDeAverias_UsuarioAcceso on rt.TN_UsuarioId equals ua.TN_ID
                                                     select new MisReportesSeguimientos
                                                     {
                                                         ReporteId = rt.TN_ReporteId,
                                                         UsuarioId = rt.TN_UsuarioId,
                                                         FechaSeguimiento = rt.TF_FechaSeguimiento,
                                                         UsuarioAsignadoId = ua.TN_ID,
                                                         UsuarioAsignado = ua.TC_Nombre,
                                                         UsuarioSeguimientoId = rt.TN_FuncionarioSeguimiento
                                                     }).ToListAsync();


                var funcionarioAsignado = "";
                var funcionarioSeguimiento = "";

                UsuarioDatos funcionario = new UsuarioDatos();
                UsuarioDatos usuarioSeguimiento = new UsuarioDatos();

                for (int x = 0; x < reporteLista.Count; x++)
                {
                    for (int i = 0; i < reporteListaSeguimiento.Count; i++)
                    {
                        if (reporteLista[x].ID == reporteListaSeguimiento[i].ReporteId)             // Mismo reporte
                        {

                            funcionario = await (from ua in _context.TReporteDeAverias_UsuarioAcceso            // Funcionario Asignado
                                                 where ua.TN_ID == reporteListaSeguimiento[i].UsuarioId
                                                 select new UsuarioDatos
                                                 {
                                                     ID = ua.TN_ID,
                                                     Rol = null,
                                                     Nombre = ua.TC_Nombre,
                                                     PrimerApellido = ua.TC_PrimerApellido,
                                                     SegundoApellido = ua.TC_SegundoApellido,
                                                     TipoIdentificacionId = ua.TN_TipoIdentificacionId,
                                                     Identificacion = ua.TC_Identificacion,
                                                     Usuario = ua.TC_Usuario,
                                                     Contrasenna = null,
                                                     Correo = null,
                                                     UsuarioActuailiza = null,
                                                     Observaciones = null,
                                                     FechaActualiza = null
                                                 }).FirstOrDefaultAsync();

                            usuarioSeguimiento = await (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                                        where ua.TN_ID == reporteListaSeguimiento[i].UsuarioSeguimientoId       // Funcionario creador del seguimiento
                                                        select new UsuarioDatos
                                                        {
                                                            ID = ua.TN_ID,
                                                            Rol = null,
                                                            Nombre = ua.TC_Nombre,
                                                            PrimerApellido = ua.TC_PrimerApellido,
                                                            SegundoApellido = ua.TC_SegundoApellido,
                                                            TipoIdentificacionId = ua.TN_TipoIdentificacionId,
                                                            Identificacion = ua.TC_Identificacion,
                                                            Usuario = ua.TC_Usuario,
                                                            Contrasenna = null,
                                                            Correo = null,
                                                            UsuarioActuailiza = null,
                                                            Observaciones = null,
                                                            FechaActualiza = null
                                                        }).FirstOrDefaultAsync();


                            funcionarioAsignado = funcionarioAsignado + (funcionario.Nombre + ' ' + funcionario.PrimerApellido + ' ' + funcionario.SegundoApellido + ' ');

                            funcionarioSeguimiento = usuarioSeguimiento.Nombre + ' ' + usuarioSeguimiento.PrimerApellido + ' ' + usuarioSeguimiento.SegundoApellido;

                            reporteLista[x].UsuarioSeguimiento = funcionarioSeguimiento;
                            reporteLista[x].UsuarioAsignado = funcionarioAsignado;

                            reporteLista[x].UsuarioSeguimientoId = reporteListaSeguimiento[i].UsuarioSeguimientoId;
                            reporteLista[x].FechaSeguimiento = reporteListaSeguimiento[i].FechaSeguimiento;

                        }
                    }


                    funcionarioSeguimiento = "";
                    funcionarioAsignado = "";
                }

                return reporteLista;
            }
        }

        public async Task<List<MisReportesSeguimientos>> MisReportesSeguimientos(int idReporte)
        {
            using (var _context = new BDContext())
            {
                var reporteLista = await (from rt in _context.TReporteDeAverias_ReporteTecnico
                                          join r in _context.TReporteDeAverias_Reporte on rt.TN_ReporteId equals r.TN_ID
                                          join ua in _context.TReporteDeAverias_UsuarioAcceso on rt.TN_UsuarioId equals ua.TN_ID
                                          where rt.TN_ReporteId == idReporte
                                          select new MisReportesSeguimientos
                                          {
                                              ReporteId = rt.TN_ReporteId,
                                              UsuarioId = rt.TN_UsuarioId,
                                              FechaSeguimiento = rt.TF_FechaSeguimiento,
                                              UsuarioAsignadoId = ua.TN_ID,
                                              UsuarioAsignado = ua.TC_Nombre,
                                              UsuarioSeguimientoId = rt.TN_FuncionarioSeguimiento
                                          }).ToListAsync();


                return reporteLista;
            }
        }


        public async Task<List<MisReportes>> generarHojaTrabajo(int idUsuario, int idEdificio, int idUsuarioActual)
        {
            using (var _context = new BDContext())
            {
                var reporteLista = await (from r in _context.TReporteDeAverias_Reporte
                                          join ua in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals ua.TN_ID
                                          join tr in _context.TReporteDeAverias_TipoReporte on r.TN_TipoId equals tr.TN_ID
                                          join e in _context.TReporteDeAverias_Edificio on r.TN_EdificioId equals e.TN_ID
                                          join o in _context.TReporteDeAverias_Oficina on r.TN_OficinaId equals o.TN_ID
                                          join er in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals er.TN_ID
                                          join p in _context.TReporteDeAverias_Prioridad on r.TN_PrioridadId equals p.TN_ID
                                          join c in _context.TReporteDeAverias_ReporteComentario on r.TN_ID equals c.TN_ReporteId
                                          where ua.TN_ID == idUsuario && e.TN_ID == idEdificio && er.TC_Nombre != "Tramitado"
                                          select new MisReportes
                                          {
                                              Prioridad = p.TC_Nombre,
                                              ID = r.TN_ID,
                                              UsuarioId = ua.TN_ID,
                                              EdificioId = e.TN_ID,
                                              OficinaId = o.TN_ID,
                                              EstadoId = er.TN_ID,
                                              TipoId = tr.TN_ID,
                                              PrioridadId = p.TN_ID,
                                              Tipo = tr.TC_Nombre,
                                              Descripcion = r.TC_Descripcion,
                                              Edificio = e.TC_Nombre,
                                              Oficina = o.TC_Nombre,
                                              Estado = er.TC_Nombre,
                                              FechaSeguimiento = r.TF_FechaInicio,
                                              Usuario = ua.TC_Nombre + ' ' + ua.TC_PrimerApellido + ' ' + ua.TC_SegundoApellido,
                                              Comentario = (c.TB_Publico == false && (c.TN_UsuarioId == idUsuarioActual) || r.TN_UsuarioId == idUsuarioActual) ? c.TC_Comentario :
                                               (c.TB_Publico == false && c.TN_UsuarioId != idUsuarioActual) ? "Comentario Privado" : c.TC_Comentario
                                          }).ToListAsync();
                return reporteLista;
            }
        }

        public async Task<List<ReporteDatos>> consultarAveria(DateTime fechaInicial, DateTime fechaFinal)
        {

            using (var _context = new BDContext())
            {



                var reporteBuscar = await (from r in _context.TReporteDeAverias_Reporte
                                           join tr in _context.TReporteDeAverias_TipoReporte on r.TN_TipoId equals tr.TN_ID
                                           join o in _context.TReporteDeAverias_Oficina on r.TN_OficinaId equals o.TN_ID
                                           join e in _context.TReporteDeAverias_Edificio on r.TN_EdificioId equals e.TN_ID
                                           join p in _context.TReporteDeAverias_Prioridad on r.TN_PrioridadId equals p.TN_ID
                                           join es in _context.TReporteDeAverias_EstadoReporte on r.TN_EstadoId equals es.TN_ID
                                           join ua in _context.TReporteDeAverias_UsuarioAcceso on r.TN_UsuarioId equals ua.TN_ID
                                           where ((r.TF_FechaInicio >= fechaInicial && r.TF_FechaInicio <= fechaFinal))
                                           orderby r.TN_ID descending
                                           select new ReporteDatos
                                           {
                                               ID = r.TN_ID,
                                               UsuarioId = ua.TN_ID,
                                               EdificioId = e.TN_ID,
                                               OficinaId = o.TN_ID,
                                               EstadoId = es.TN_ID,
                                               TipoId = tr.TN_ID,
                                               PrioridadId = p.TN_ID,
                                               Tipo = tr.TC_Nombre,
                                               Descripcion = r.TC_Descripcion,
                                               Edificio = e.TC_Nombre,
                                               Oficina = o.TC_Nombre,
                                               Prioridad = p.TC_Nombre,
                                               Estado = es.TC_Nombre,
                                               Usuario = ua.TC_Nombre + ' ' + ua.TC_PrimerApellido + ' ' + ua.TC_SegundoApellido,
                                               FechaInicio = r.TF_FechaInicio,
                                           }).ToListAsync();
                return reporteBuscar;
            }
        }



    }
}
