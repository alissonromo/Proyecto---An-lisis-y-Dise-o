using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RDAAccesoADatos.Context;
using RDAEntidades.Entities;

namespace RDAAccesoADatos.Data
{
    public class DataTipoReporte
    {
        public async Task<String> registarTipoReporte(TipoReporte tipoReporte)
        {
            try
            {
                using (var _context = new BDContext())
                {
                    _context.TReporteDeAverias_TipoReporte.Add(tipoReporte);
                    await _context.SaveChangesAsync();

                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
            }
            return "Tipo de reporte Registrado";

        }

        public async Task<List<TipoReporte>> listarTipoReporte()
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_TipoReporte.ToListAsync();
            }
        }

        public async Task<List<TipoReporte>> buscarTipoReporte(string nombre)
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_TipoReporte.Where(x => x.TC_Nombre.Contains(nombre)).ToListAsync();
            }
        }

        public async Task<String> modificarTipoReporte(TipoReporte tipoReporte)
        {

            try
            {
                using (var _context = new BDContext())
                {
                    _context.Entry(tipoReporte).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Tipo de reporte Actualizado";

        }

        public async Task<String> eliminarTipoReporte(TipoReporte tipoReporte)
        {
            using (var _context = new BDContext())
            {
                try
                {
                    _context.TReporteDeAverias_TipoReporte.Remove(tipoReporte);
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se puede eliminar. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
                }
                return "Tipo de reporte Eliminado";
            }
        }

    }
}
