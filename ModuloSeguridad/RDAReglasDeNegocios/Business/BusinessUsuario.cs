using RDAAccesoADatos.Data;
using RDAEntidades.Entities;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessUsuario
    {

        private DataUsuario dataUsuario;

        public BusinessUsuario()
        {
            dataUsuario = new DataUsuario();
        }

        public async Task<Login> buscarUsuario(string usuario, string contrasenna)
        {
            return await dataUsuario.buscarUsuario(usuario, contrasenna);
        }

        public async Task<Rol> buscarUsuarioRol(string nombreOficina, int usuarioId)
        {
            return await dataUsuario.buscarUsuarioRol(nombreOficina, usuarioId);
        }

    }
}
