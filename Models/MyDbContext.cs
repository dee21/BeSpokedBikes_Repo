using BeSpokedBikesSalseTrackingApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Xml;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
    : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Products>()
            .HasKey(p => p.ProductID);

        modelBuilder.Entity<SalesPersons>()
            .HasKey(Sp => Sp.SalesPersonId);

        modelBuilder.Entity<Saless>()
            .HasKey(s => s.SalesId);

        modelBuilder.Entity<Discounts>()
            .HasKey(d => d.DiscountId);

        modelBuilder.Entity<Customers>()
            .HasKey(c => c.CustomerId);
    }

    public DbSet<Products> Product { get; set; }
    public DbSet<SalesPersons> SalesPerson { get; set; }
    public DbSet<Saless> Sales { get; set; }
    public DbSet<Discounts> Discount { get; set; }
    public DbSet<Customers> Customer { get; set; }
}