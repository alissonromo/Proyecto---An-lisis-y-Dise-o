using Microsoft.AspNetCore.Mvc;
using RDAAccesoADatos.Data;
using RDAEntidades.Entities;
using RDAReglasDeNegocio.Business;

namespace ReporteDeAverias.Controllers
{
    public class ReporteTecnicoController
    {
        public IConfiguration Configuration { get; }

        public ReporteTecnicoController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpPost]
        [Route("modificarReporteTecnico")]
        public async Task<String> modificarReporteTecnico(ReporteTecnico reporteTecnico)
        {
            return await (new BusinessReporteTecnico().modificarReporteTecnico(reporteTecnico));
        }

        [HttpPost]
        [Route("buscarTecnicosPorAnio")]
        public async Task<List<ReporteTecnicoPorFecha>> buscarTecnicosPorAnio(string param, DateTime fechaInicio, DateTime fechaFinal)
        {
            return await (new BusinessReporteTecnico().buscarTecnicosPorAnio(param, fechaInicio, fechaFinal));
        }

        [HttpPost]
        [Route("buscarTecnicosPorMes")]
        public async Task<List<ReporteTecnicoPorFecha>> buscarTecnicosPorMes(string param, DateTime fechaInicio, DateTime fechaFinal)
        {
            return await (new BusinessReporteTecnico().buscarTecnicosPorMes(param, fechaInicio, fechaFinal));
        }

    }
}
