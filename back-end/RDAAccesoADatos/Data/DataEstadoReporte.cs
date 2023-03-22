using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using RDAAccesoADatos.Context;
using RDAEntidades.Entities;
using Microsoft.EntityFrameworkCore;

namespace RDAAccesoADatos.Data
{
    public class DataEstadoReporte
    {
        public async Task<List<EstadoReporte>> listarEstadoReporte()
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_EstadoReporte.ToListAsync();
            }
        }

        public async Task<String> registarEstadoReporte(EstadoReporte estadoReporte)
        {
            try
            {
                using (var _context = new BDContext())
                {
                    _context.TReporteDeAverias_EstadoReporte.Add(estadoReporte);
                    await _context.SaveChangesAsync();

                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
            }
            return "Estado del Reporte Registrado";

        }

        public async Task<List<EstadoReporte>> buscarEstadoReporte(string nombre)
        {
            using (var _context = new BDContext())
            {
                return await _context.TReporteDeAverias_EstadoReporte.Where(x => x.TC_Nombre.Contains(nombre)).ToListAsync();
            }
        }

        public async Task<String> modificarEstadoReporte(EstadoReporte estadoReporte)
        {

            try
            {
                using (var _context = new BDContext())
                {
                    _context.Entry(estadoReporte).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException /* ex */)
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Estado de Reporte Actualizado";

        }

        public async Task<String> eliminarEstadoReporte(EstadoReporte estadoReporte)
        {
            using (var _context = new BDContext())
            {
               
                try
                {
                    _context.TReporteDeAverias_EstadoReporte.Remove(estadoReporte);
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateException /* ex */)
                {
                    return "No se puede eliminar. " +
                         "Vuelve a intentarlo y, si el problema persiste, " +
                         "consulte con el administrador del sistema.";
                }
                return "estado de Reporte Eliminado";
            }
        }

    }
}
