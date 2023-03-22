using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessUsuario
    {

        private DataUsuario dataUsuario;

        public BusinessUsuario()
        {
            dataUsuario = new DataUsuario();
        }

        public async Task<String> registarUsuario(UsuarioDatos usuarioDatos, string nombreOficina)
        {
            return await dataUsuario.registarUsuario(usuarioDatos, nombreOficina);
        }

        public async Task<List<UsuarioDatos>> listarUsuario()
        {
            return await dataUsuario.listarUsuario();
        }

        public async Task<List<UsuarioDatos>> buscarUsuario(string param)
        {
            return await dataUsuario.buscarUsuario(param);
        }

        public async Task<String> modificarUsuario(UsuarioDatos usuarioDatos)
        {
            return await dataUsuario.modificarUsuario(usuarioDatos);
        }

        public async Task<String> eliminarUsuario(Usuario usuario,int idOficina, int idRol)
        {
            return await dataUsuario.eliminarUsuario(usuario,idOficina,idRol);
        }

        public async Task<String> asignarTecnico(int numReporte, List<int> idUsuarios, int idUsuarioActual) 
        {
            return await dataUsuario.asignarTecnico(numReporte,idUsuarios, idUsuarioActual);
        }

        public async Task<String> asignarEdificios(List<int> idEdificios) //Se asigna uno por uno
        {
            return await dataUsuario.asignarEdificios(idEdificios);
        }

        public async Task<String> asignarRolOficina(List<int> idRol, List<int> idOficinas) //Se asigna uno por uno
        {
            return await dataUsuario.asignarRolOficina(idRol,idOficinas);
        }

        public async Task<List<UsuarioDatos>> buscarUsuarioPorRol(string param)
        {
            return await dataUsuario.buscarUsuarioPorRol(param);
        }

    }
}
