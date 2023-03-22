using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RDAReglasDeNegocio.Business
{
    public class BusinessReporteTecnico
    {
        private DataReporteTecnico dataReporteTecnico;

        public BusinessReporteTecnico()
        {
            dataReporteTecnico = new DataReporteTecnico();
        }
        public async Task<String> modificarReporteTecnico(ReporteTecnico reporteTecnico)
        {
            return await dataReporteTecnico.modificarReporteTecnico(reporteTecnico);
        }

        public async Task<List<ReporteTecnicoPorFecha>> buscarTecnicosPorAnio(string param, DateTime fechaInicio, DateTime fechaFinal)
        {
            return await dataReporteTecnico.buscarTecnicosPorAnio(param, fechaInicio, fechaFinal);
        }

        public async Task<List<ReporteTecnicoPorFecha>> buscarTecnicosPorMes(string param, DateTime fechaInicio, DateTime fechaFinal)
        {
            return await dataReporteTecnico.buscarTecnicosPorMes(param, fechaInicio, fechaFinal);
        }


    }
}
