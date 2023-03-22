using Microsoft.EntityFrameworkCore;
using RDAEntidades.Entities;

namespace RDAAccesoADatos.Context
{
    public partial class BDContext : DbContext
    {
        public BDContext() 
        {

        }

        public virtual DbSet<Edificio> TReporteDeAverias_Edificio { get; set; }
        public virtual DbSet<EstadoReporte> TReporteDeAverias_EstadoReporte { get; set; }
        public virtual DbSet<Oficina> TReporteDeAverias_Oficina { get; set; }
        public virtual DbSet<Prioridad> TReporteDeAverias_Prioridad { get; set; }
        public virtual DbSet<Reporte> TReporteDeAverias_Reporte { get; set; }
        public virtual DbSet<Usuario> TReporteDeAverias_UsuarioAcceso { get; set; }
        public virtual DbSet<TipoReporte> TReporteDeAverias_TipoReporte { get; set; }
        public virtual DbSet<Rol> TReporteDeAverias_Rol { get; set; }
        public virtual DbSet<TipoIdentificacion> TReporteDeAverias_TipoIdentificacion { get; set; }
        public virtual DbSet<ReporteComentario> TReporteDeAverias_ReporteComentario { get; set; }
        public virtual DbSet<ReporteTecnico> TReporteDeAverias_ReporteTecnico { get; set; }
       // public virtual DbSet<UsuarioOficina> TReporteDeAverias_UsuarioOficina { get; set; }
        public virtual DbSet<UsuarioRolOficina> TReporteDeAverias_UsuarioRolOficina { get; set; }
       
       // public virtual List<RolOficina> rol { get; set; }
        //public virtual List<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer($"Data Source=163.178.107.10;Initial Catalog=IF6100_ReporteDeAverias;Persist Security Info=True;User ID=laboratorios;Password=TUy&)&nfC7QqQau.%278UQ24/=%;Pooling=False; TrustServerCertificate=True");
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReporteTecnico>()
                .HasKey(c => new { c.TN_ReporteId, c.TN_UsuarioId });
            /* modelBuilder.Entity<UsuarioOficina>()
                 .HasKey(c => new { c.TN_OficinaId, c.TN_UsuarioId });*/
            modelBuilder.Entity<UsuarioRolOficina>()
                .HasKey(c => new { c.TN_UsuarioId, c.TN_OficinaId, c.TN_RolId })
                ;

        }
    }
}
