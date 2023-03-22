using RDAEntidades.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using RDAAccesoADatos.Context;
using Microsoft.EntityFrameworkCore;

namespace RDAAccesoADatos.Data
{
    public class DataEdificio
    {
        public async Task<List<Edificio>> listarEdificio()  
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_Edificio.ToListAsync();
            }
        }

        public async Task<String> registarEdificio(Edificio edificio)
        {
            try
            {
                using (var _context = new BDContext())
                {
                    _context.TReporteDeAverias_Edificio.Add(edificio);
                    await _context.SaveChangesAsync();

                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
            }
            return "Edificio Registrado";

        }

        public async Task<List<Edificio>> buscarEdificio(string nombre)
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_Edificio.Where(x => x.TC_Nombre.Contains(nombre)).ToListAsync();
            }
        }

       public async Task<String> modificarEdificio(Edificio edificio)
        {
           
            try
            {
                using (var _context = new BDContext())
                {
                    _context.Entry(edificio).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Oficina Actualizada";

        }

        public async Task<String> eliminarEdificio(Edificio edificio)
        {
            using (var _context = new BDContext())
            {
                try
                {
                    _context.TReporteDeAverias_Edificio.Remove(edificio);
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se puede eliminar. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
                }
                return "Oficina Eliminada";
            }
        }

    }
}
