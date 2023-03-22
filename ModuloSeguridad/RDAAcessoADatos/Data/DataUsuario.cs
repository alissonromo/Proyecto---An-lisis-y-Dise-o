using RDAEntidades.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using RDAAccesoADatos.Context;
using Microsoft.EntityFrameworkCore;

namespace RDAAccesoADatos.Data
{
    public class DataUsuario
    {
        private SqlConnection sqlConnection;
        private SqlCommand sqlCommand;

        public DataUsuario()
        {
            sqlConnection = new SqlConnection("Data Source=163.178.107.10;Initial Catalog=IF6100_ReporteDeAverias;Persist Security Info=True;User ID=laboratorios;Password=TUy&)&nfC7QqQau.%278UQ24/=%;Pooling=False;TrustServerCertificate=True");
            sqlCommand = new SqlCommand();
        }

        public async Task<Login> buscarUsuario(string usuario, string contrasenna)
        {
            Login login = new Login();
            var buscarLogin = new Login();
            using (var _context = new BDContext())
            {
                buscarLogin = await (from ua in _context.TReporteDeAverias_UsuarioAcceso
                                        where ua.TC_Usuario == usuario && ua.TC_Contrasenna == contrasenna
                                        select new Login
                                        {
                                            ID = ua.TN_ID,
                                            Usuario = ua.TC_Usuario,
                                            Contrasenna = ua.TC_Contrasenna
                                        }).FirstOrDefaultAsync();
            }

            if (buscarLogin == null)
            {
                login.ID = null;
                login.Usuario = null;
                login.Contrasenna = null;
            }
            else
            {
                login = buscarLogin;
            }
            return login;
        }

        public async Task<Rol> buscarUsuarioRol(string nombreOficina, int usuarioId)
        {
            Rol rol = new Rol();
            var buscarRol = new Rol();

            using (var _context = new BDContext())
            {
                var oficinaId = (from o in _context.TReporteDeAverias_Oficina
                                    where o.TC_Nombre == nombreOficina
                                    select o.TN_ID).FirstOrDefault();

                buscarRol = await (from uro in _context.TReporteDeAverias_UsuarioRolOficina
                            join ua in _context.TReporteDeAverias_UsuarioAcceso on uro.TN_UsuarioId equals ua.TN_ID
                            join r in _context.TReporteDeAverias_Rol on uro.TN_RolId equals r.TN_ID
                            join o in _context.TReporteDeAverias_Oficina on uro.TN_OficinaId equals o.TN_ID
                            where uro.TN_UsuarioId == usuarioId && uro.TN_OficinaId == oficinaId
                            select new Rol
                            {
                                TN_ID = r.TN_ID,
                                TC_Nombre = r.TC_Nombre
                            }).FirstOrDefaultAsync(); 
            }

            if (buscarRol == null)
            {
                rol.TN_ID = null;
                rol.TC_Nombre = null;
            }
            else
            {
                rol = buscarRol;
            }
            return rol;
        }
    }
}