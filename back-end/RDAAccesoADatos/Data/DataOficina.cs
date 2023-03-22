using RDAAccesoADatos.Context;
using RDAEntidades.Entities;
using Microsoft.EntityFrameworkCore;

namespace RDAAccesoADatos.Data
{
    public class DataOficina
    {
        public async Task<List<ListaOficina>> listarOficina()
        {
            using (var _context = new BDContext())
            {
                var listaOficina = (from o in _context.TReporteDeAverias_Oficina
                                    join e in _context.TReporteDeAverias_Edificio on o.TN_EdificioId equals e.TN_ID
                                    select new ListaOficina
                                    {
                                        ID = o.TN_ID,
                                        Edificio = e.TC_Nombre,
                                        Codigo = o.TC_Codigo,
                                        Nombre = o.TC_Nombre
                                    });


                return await listaOficina.ToListAsync();
            }
        }

        public async Task<List<ListaOficina>> listarOficinaPorEdificio(Edificio edificio)
        {
            using (var _context = new BDContext())
            {
                var listaOficina = (from o in _context.TReporteDeAverias_Oficina
                                    join e in _context.TReporteDeAverias_Edificio on o.TN_EdificioId equals e.TN_ID
                                    where o.TN_EdificioId == edificio.TN_ID 
                                    select new ListaOficina
                                    {

                                        ID = o.TN_ID,
                                        EdificioId = e.TN_ID,
                                        Edificio = e.TC_Nombre,
                                        Codigo = o.TC_Codigo,
                                        Nombre = o.TC_Nombre,
                                    });


                return await listaOficina.ToListAsync();
            }
        }

    }
}
