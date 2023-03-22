using Microsoft.EntityFrameworkCore;
using RDAEntidades.Entities;

namespace RDAAccesoADatos.Context
{
    public partial class BDContext : DbContext
    {
        public BDContext()
        {
        }

        public virtual DbSet<Usuario> TReporteDeAverias_UsuarioAcceso { get; set; }

        public virtual DbSet<Rol> TReporteDeAverias_Rol { get; set; }
 
        public virtual DbSet<Oficina> TReporteDeAverias_Oficina { get; set; }
       
        public virtual DbSet<UsuarioRolOficina> TReporteDeAverias_UsuarioRolOficina { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer($"Data Source=163.178.107.10;Initial Catalog=IF6100_ReporteDeAverias;Persist Security Info=True;User ID=laboratorios;Password=TUy&)&nfC7QqQau.%278UQ24/=%;Pooling=False; TrustServerCertificate=True");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioRolOficina>()
                .HasKey(c => new { c.TN_UsuarioId, c.TN_OficinaId, c.TN_RolId });
        }
    }
}
