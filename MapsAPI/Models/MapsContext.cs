using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MapsAPI.Models;

public partial class MapsContext : DbContext
{
    public MapsContext()
    {
    }

    public MapsContext(DbContextOptions<MapsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Map> Maps { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("PK__Location__E7FEA4773311138E");

            entity.Property(e => e.LocationId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("LocationID");
            entity.Property(e => e.Country)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.MapId).HasColumnName("MapID");

            entity.HasOne(d => d.Map).WithMany(p => p.Locations)
                .HasForeignKey(d => d.MapId)
                .HasConstraintName("FK_Locations_Maps");
        });

        modelBuilder.Entity<Map>(entity =>
        {
            entity.HasKey(e => e.MapId).HasName("PK__Maps__3265E2FB28485EA8");

            entity.Property(e => e.MapId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("MapID");
            entity.Property(e => e.Creator)
                .HasMaxLength(55)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(55)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CCD516378");

            entity.Property(e => e.UserId).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
