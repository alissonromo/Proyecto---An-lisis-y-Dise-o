using RDAEntidades.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using RDAAccesoADatos.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections;
using System.Web.Http;
using System.Numerics;

namespace RDAAccesoADatos.Data
{
    public class DataUsuario
    {
        public async Task<List<UsuarioDatos>> listarUsuario()
        {
            using (var _context = new BDContext())
            {
                var usuarioBuscar = await (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                           join uro in _context.TReporteDeAverias_UsuarioRolOficina on ua.TN_ID equals uro.TN_UsuarioId
                                           join r in _context.TReporteDeAverias_Rol on uro.TN_RolId equals r.TN_ID 
                                           join ti in _context.TReporteDeAverias_TipoIdentificacion on ua.TN_TipoIdentificacionId equals ti.TN_ID
                                           where  r.TC_Nombre != "Administrador" && ua.TB_Activo!=false
                                           select new UsuarioDatos
                                           {
                                               ID = ua.TN_ID,
                                               TipoIdentificacionId = ti.TN_ID,
                                               UsuarioActuailiza = ua.TC_UsuarioActuailiza,
                                               Observaciones = ua.TC_Observaciones,
                                               FechaActualiza = ua.TF_FechaActualiza,
                                               Rol = r.TC_Nombre,
                                               Nombre = ua.TC_Nombre,
                                               PrimerApellido = ua.TC_PrimerApellido,
                                               SegundoApellido = ua.TC_SegundoApellido,
                                               Identificacion = ua.TC_Identificacion,
                                               Usuario = ua.TC_Usuario,
                                               Correo = ua.TC_Correo,
                                               OficinaId = uro.TN_OficinaId,
                                               RolId = uro.TN_RolId
                                           }).ToListAsync();
                return usuarioBuscar;
            }
        }

        public async Task<String> registarUsuario(UsuarioDatos usuarioDatos, string nombreOficina)  // Necesito la Oficina
        {   
            try
            {
                using (var _context = new BDContext())
                {
                        var usuario = new Usuario();
                        usuario.TN_CantidadIntentosAcceso = 0;
                        usuario.TN_TipoIdentificacionId = usuarioDatos.TipoIdentificacionId;
                        usuario.TC_Identificacion = usuarioDatos.Identificacion;
                        usuario.TC_Usuario = usuarioDatos.Usuario;
                        usuario.TC_Contrasenna = usuarioDatos.Contrasenna;
                        usuario.TC_Nombre = usuarioDatos.Nombre;
                        usuario.TC_PrimerApellido = usuarioDatos.PrimerApellido;
                        usuario.TC_SegundoApellido = usuarioDatos.SegundoApellido;
                        usuario.TC_Correo = usuarioDatos.Correo;
                        usuario.TC_UsuarioActuailiza = null;
                        usuario.TC_Observaciones = null;
                        usuario.TF_FechaActualiza = DateTime.Today;
                        usuario.TB_Activo = true;

                        _context.TReporteDeAverias_UsuarioAcceso.Add(usuario);
                        await _context.SaveChangesAsync();

                      
                    }
               // }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
            }
            return "Usuario Registrado";

        }

        public async Task<List<UsuarioDatos>> buscarUsuario(string param)
        {
            using (var _context = new BDContext())
            {
                var usuarioBuscar = await (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                           join uro in _context.TReporteDeAverias_UsuarioRolOficina on ua.TN_ID equals uro.TN_UsuarioId
                                           join r in _context.TReporteDeAverias_Rol on uro.TN_RolId equals r.TN_ID
                                           join ti in _context.TReporteDeAverias_TipoIdentificacion on ua.TN_TipoIdentificacionId equals ti.TN_ID
                                           where  r.TC_Nombre != "Administrador" 
                                                 && (r.TC_Nombre.Contains(param) || ua.TC_Nombre.Contains(param) || ua.TC_PrimerApellido.Contains(param) 
                                                 || ua.TC_SegundoApellido.Contains(param) || ua.TC_Usuario.Contains(param) 
                                                 || ti.TC_Nombre.Contains(param) || ua.TC_Correo.Contains(param) || ua.TN_ID+"" == param || r.TN_ID + "" == param)
                                           select new UsuarioDatos
                                           {
                                              ID = ua.TN_ID,
                                              TipoIdentificacionId = ti.TN_ID,
                                              UsuarioActuailiza = ua.TC_UsuarioActuailiza,
                                              Observaciones = ua.TC_Observaciones,
                                              FechaActualiza = ua.TF_FechaActualiza,
                                              Rol = r.TC_Nombre,
                                              Nombre = ua.TC_Nombre,
                                              PrimerApellido = ua.TC_PrimerApellido,
                                              SegundoApellido = ua.TC_SegundoApellido,
                                              Usuario = ua.TC_Usuario,
                                              Identificacion = ua.TC_Identificacion,
                                              Correo = ua.TC_Correo
                                           }).ToListAsync();
                return usuarioBuscar;
            }
        }

        public async Task<List<UsuarioDatos>> buscarUsuarioPorRol(string param)
        {
            using (var _context = new BDContext())
            {
                var usuarioBuscar = await (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                           join uro in _context.TReporteDeAverias_UsuarioRolOficina on ua.TN_ID equals uro.TN_UsuarioId
                                           join r in _context.TReporteDeAverias_Rol on uro.TN_RolId equals r.TN_ID
                                           join ti in _context.TReporteDeAverias_TipoIdentificacion on ua.TN_TipoIdentificacionId equals ti.TN_ID
                                           where r.TC_Nombre != "Administrador"
                                                 && uro.TN_RolId+""==param
                                           select new UsuarioDatos
                                           {
                                               ID = ua.TN_ID,
                                               TipoIdentificacionId = ti.TN_ID,
                                               UsuarioActuailiza = ua.TC_UsuarioActuailiza,
                                               Observaciones = ua.TC_Observaciones,
                                               FechaActualiza = ua.TF_FechaActualiza,
                                               Rol = r.TC_Nombre,
                                               Nombre = ua.TC_Nombre,
                                               PrimerApellido = ua.TC_PrimerApellido,
                                               SegundoApellido = ua.TC_SegundoApellido,
                                               Usuario = ua.TC_Usuario,
                                               Identificacion = ua.TC_Identificacion,
                                               Correo = ua.TC_Correo
                                           }).Distinct().ToListAsync();
                return usuarioBuscar;
            }
        }

        public async Task<String> modificarUsuario(UsuarioDatos usuarioDatos) // String nombreOficina
        {
            try
            {
                using (var _context = new BDContext())
                {
                    var usuario = new Usuario();
                    usuario = _context.TReporteDeAverias_UsuarioAcceso.Find(usuarioDatos.ID);

                    if (usuario != null)
                    {
                        var getID = usuarioDatos.ID;

                        if (usuarioDatos.Usuario != null)
                        {
                            usuario.TC_Usuario = usuarioDatos.Usuario;
                        }

                        if (usuarioDatos.Nombre != null)
                        {
                            usuario.TC_Nombre = usuarioDatos.Nombre;
                        }

                        if (usuarioDatos.PrimerApellido != null)
                        {
                            usuario.TC_PrimerApellido = usuarioDatos.PrimerApellido;
                        }

                        if (usuarioDatos.SegundoApellido != null)
                        {
                            usuario.TC_SegundoApellido = usuarioDatos.SegundoApellido;
                        }

                        if (usuarioDatos.Correo != null)
                        {
                            usuario.TC_Correo = usuarioDatos.Correo;
                        }

                        _context.Entry(usuario).State = EntityState.Modified;
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
            return "Usuario Actualizado";
        }

        public async Task<String> eliminarUsuario(Usuario usuario, int idOficina, int idRol)
        {
            using (var _context = new BDContext())
            {
                try
                {
                    var usuarioTem = new Usuario();
                    var usuarioRolOficina = _context.TReporteDeAverias_UsuarioRolOficina.Find(usuario.TN_ID, idOficina, idRol);

                   
                      if (usuarioRolOficina != null)
                      {
                         _context.TReporteDeAverias_UsuarioRolOficina.Remove(usuarioRolOficina);
                          await _context.SaveChangesAsync();
                      }

                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se puede eliminar. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
                }
              return "Usuario Eliminado";
            }
        }


        public async Task<String> asignarTecnico(int numReporte, List<int> idUsuarios, int idUsuarioActual) //Se asigna uno por uno
          {

            for (int i = 0; i < idUsuarios.Count; i++) {
                try
                {
                    using (var _context = new BDContext())
                    {
                        ReporteTecnico reporteTecnico = new ReporteTecnico();
                        reporteTecnico.TN_ReporteId= numReporte;
                        reporteTecnico.TN_UsuarioId = idUsuarios[i];
                        reporteTecnico.TN_MontoMateriales = null;
                        reporteTecnico.TN_CantidadTareas = null;
                        reporteTecnico.TN_Horas = null;
                        reporteTecnico.TN_Minutos = null;
                        reporteTecnico.TN_FuncionarioSeguimiento = idUsuarioActual;
                        reporteTecnico.TF_FechaSeguimiento = DateTime.Now;

                        _context.TReporteDeAverias_ReporteTecnico.Add(reporteTecnico);
                        await _context.SaveChangesAsync();

                    }
                }
                catch (DbUpdateException /* ex */)
                {

                    return "No se pueden guardar los cambios. " +
                             "Vuelve a intentarlo y, si el problema persiste, " +
                             "consulte con el administrador del sistema.";
                }
            }

            return "Tecnicos Asignados";
        }

        public async Task<String> asignarEdificios(List<int> idEdificios) //Se asigna uno por uno
        {
                try
                {
                    for (int i = 0; i < idEdificios.Count; i++)
                    {
                        using (var _context = new BDContext())
                        {
                            var oficinaBuscar = new List<Oficina>();
                            oficinaBuscar = await _context.TReporteDeAverias_Oficina.Where(x => x.TN_EdificioId == idEdificios[i]).ToListAsync();

                            if (oficinaBuscar != null)
                            {
                                for (int j = 0; j < oficinaBuscar.Count; j++)
                                {
                                    
                                    UsuarioRolOficina usuarioRolOficina = new UsuarioRolOficina();
                                    usuarioRolOficina.TN_UsuarioId = (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                                                      orderby ua.TN_ID descending
                                                                      select ua.TN_ID).First();


                                    usuarioRolOficina.TN_OficinaId = oficinaBuscar[j].TN_ID;
                                    usuarioRolOficina.TN_RolId = 5;

                                    _context.TReporteDeAverias_UsuarioRolOficina.Add(usuarioRolOficina);
                                    await _context.SaveChangesAsync();
                                }
                            }
                        }
                    }
                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se pueden guardar los cambios. " +
                             "Vuelve a intentarlo y, si el problema persiste, " +
                             "consulte con el administrador del sistema.";
                }
            return "Tecnicos Asignados";
        }

        public async Task<String> asignarRolOficina(List<int> idRol, List<int> idOficinas) //Se asigna uno por uno
        {
            try
            {
               

                   for (int i = 0; i < idRol.Count; i++)
                   {
                using (var _context = new BDContext())
                    {

                        UsuarioRolOficina usuarioRolOficina = new UsuarioRolOficina();
                        usuarioRolOficina.TN_UsuarioId = (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                                          orderby ua.TN_ID descending
                                                          select ua.TN_ID).First();


                        usuarioRolOficina.TN_OficinaId = idOficinas[i];
                        usuarioRolOficina.TN_RolId = idRol[i];

                        _context.TReporteDeAverias_UsuarioRolOficina.Add(usuarioRolOficina);
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
            return "Rol oficina asignado2";
        }

    }
}
