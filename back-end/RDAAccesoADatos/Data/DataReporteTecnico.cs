using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RDAAccesoADatos.Context;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAAccesoADatos.Data
{
    public class DataReporteTecnico
    {
    
        public async Task<String> modificarReporteTecnico(ReporteTecnico reporteTecnico)
        {
            try
            {
                using (var _context = new BDContext())
                {

                reporteTecnico.TF_FechaSeguimiento = DateTime.Now;
                _context.Entry(reporteTecnico).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            }
            catch (DbUpdateException )
            {

                return "No se pueden guardar los cambios. " +
                    "Vuelve a intentarlo y, si el problema persiste, " +
                    "consulte con el administrador del sistema.";
            }
            return "Reporte Tecnico Actualizado";

        }

        public async Task<List<ReporteTecnicoPorFecha>> buscarTecnicosPorMes(string param, DateTime fechaInicio, DateTime fechaFinal)
        {
            using (var _context = new BDContext())
            {

                var getMes = 0;
                if (param != null)
                {
                    getMes = (((param.IndexOf("enero", StringComparison.OrdinalIgnoreCase) >= 0) ? 1 :
                                     (param.IndexOf("febrero", StringComparison.OrdinalIgnoreCase) >= 0) ? 2 :
                                     (param.IndexOf("marzo", StringComparison.OrdinalIgnoreCase) >= 0) ? 3 :
                                     (param.IndexOf("abril", StringComparison.OrdinalIgnoreCase) >= 0) ? 4 :
                                     (param.IndexOf("mayo", StringComparison.OrdinalIgnoreCase) >= 0) ? 5 :
                                     (param.IndexOf("junio", StringComparison.OrdinalIgnoreCase) >= 0) ? 6 :
                                     (param.IndexOf("julio", StringComparison.OrdinalIgnoreCase) >= 0) ? 7 :
                                     (param.IndexOf("agosto", StringComparison.OrdinalIgnoreCase) >= 0) ? 8 :
                                     (param.IndexOf("septiembre", StringComparison.OrdinalIgnoreCase) >= 0) ? 9 :
                                     (param.IndexOf("octubre", StringComparison.OrdinalIgnoreCase) >= 0) ? 10 :
                                     (param.IndexOf("noviembre", StringComparison.OrdinalIgnoreCase) >= 0) ? 11 :
                                     12));
                }


                var reporteBuscar = await (from rt in _context.TReporteDeAverias_ReporteTecnico
                                           join ua in _context.TReporteDeAverias_UsuarioAcceso on rt.TN_UsuarioId equals ua.TN_ID
                                           where (rt.TN_CantidadTareas != null || rt.TN_Minutos != null || rt.TN_MontoMateriales != null) &&
                                           (((ua.TC_Nombre.Contains(param) || rt.TF_FechaSeguimiento.Year.ToString() == param
                                           || getMes == rt.TF_FechaSeguimiento.Month) || param.IsNullOrEmpty() == true) && (rt.TF_FechaSeguimiento > fechaInicio && rt.TF_FechaSeguimiento < fechaFinal))
                                           select new { rt.TN_UsuarioId, rt.TF_FechaSeguimiento, ua.TC_Nombre } into rt2
                                           group rt2 by new { rt2.TN_UsuarioId, rt2.TF_FechaSeguimiento.Year, rt2.TF_FechaSeguimiento.Month, rt2.TC_Nombre } into g
                                           select new ReporteTecnicoPorFecha
                                           {
                                               Anio = g.Key.Year,
                                               Mes = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key.Month),
                                               NombreUsuario = g.Key.TC_Nombre,
                                               Cantidad = (g.Select(x => x.TN_UsuarioId).Count()),
                                           }).ToListAsync();



                return reporteBuscar;
            }
        }

        public async Task<List<ReporteTecnicoPorFecha>> buscarTecnicosPorAnio(string param, DateTime fechaInicio, DateTime fechaFinal)
        {
            using (var _context = new BDContext())
            {

                var reporteBuscar = await (from rt in _context.TReporteDeAverias_ReporteTecnico
                                           join ua in _context.TReporteDeAverias_UsuarioAcceso on rt.TN_UsuarioId equals ua.TN_ID
                                           where (rt.TN_CantidadTareas != null || rt.TN_Minutos != null || rt.TN_MontoMateriales != null) &&
                                           (((ua.TC_Nombre.Contains(param) || rt.TF_FechaSeguimiento.Year.ToString() == param) || param.IsNullOrEmpty() == true)
                                           && (rt.TF_FechaSeguimiento.Year >= fechaInicio.Year && rt.TF_FechaSeguimiento.Year <= fechaFinal.Year))
                                           select new { rt.TN_UsuarioId, rt.TF_FechaSeguimiento, ua.TC_Nombre } into rt2
                                           group rt2 by new { rt2.TN_UsuarioId, rt2.TF_FechaSeguimiento.Year, rt2.TC_Nombre } into g
                                           select new ReporteTecnicoPorFecha
                                           {
                                               Anio = g.Key.Year,
                                               NombreUsuario = g.Key.TC_Nombre,
                                               Cantidad = (g.Select(x => x.TN_UsuarioId).Count()),
                                           }).ToListAsync();

                return reporteBuscar;

            }
        }


    }
}
