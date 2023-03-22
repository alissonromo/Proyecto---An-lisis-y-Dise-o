using RDAAccesoADatos.Data;
using RDAEntidades.Entities;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessTipoReporte
    {
        private DataTipoReporte dataTipoReporte;

        public BusinessTipoReporte()
        {
            dataTipoReporte = new DataTipoReporte();
        }

        public async Task<String> registarTipoReporte(TipoReporte tipoReporte)
        {
            return await dataTipoReporte.registarTipoReporte(tipoReporte);
        }

        public async Task<List<TipoReporte>> listarTipoReporte()
        {
            return await dataTipoReporte.listarTipoReporte();
        }

        public async Task<List<TipoReporte>> buscarTipoReporte(string nombre)
        {
            return await dataTipoReporte.buscarTipoReporte(nombre);
        }

        public async Task<String> modificarTipoReporte(TipoReporte tipoReporte)
        {
            return await dataTipoReporte.modificarTipoReporte(tipoReporte);
        }

        public async Task<String> eliminarTipoReporte(TipoReporte tipoReporte)
        {
            return await dataTipoReporte.eliminarTipoReporte(tipoReporte);
        }

        

    }
}
