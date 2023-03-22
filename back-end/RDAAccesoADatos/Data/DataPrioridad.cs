using Microsoft.EntityFrameworkCore;
using RDAAccesoADatos.Context;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAAccesoADatos.Data
{
    public class DataPrioridad
    {
        public async Task<List<Prioridad>> listarPrioridad()
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_Prioridad.ToListAsync();
            }
        }

        public async Task<String> registarPrioridad(Prioridad prioridad)
        {
            try
            {
                using (var _context = new BDContext())
                {
                    _context.TReporteDeAverias_Prioridad.Add(prioridad);
                    await _context.SaveChangesAsync();

                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
            }
            return "Prioridad Registrada";

        }

        public async Task<List<Prioridad>> buscarPrioridad(string nombre)
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_Prioridad.Where(x => x.TC_Nombre.Contains(nombre)).ToListAsync();
            }
        }

        public async Task<String> modificarPrioridad(Prioridad prioridad)
        {

            try
            {
                using (var _context = new BDContext())
                {
                    _context.Entry(prioridad).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Prioridad Actualizada";

        }

        public async Task<String> eliminarPrioridad(Prioridad prioridad)
        {
            using (var _context = new BDContext())
            {

                try
                {
                    _context.TReporteDeAverias_Prioridad.Remove(prioridad);
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se puede eliminar. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
                }
                return "Prioridad Eliminada";
            }
        }

    }
}
