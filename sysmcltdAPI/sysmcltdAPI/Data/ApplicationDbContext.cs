
using Microsoft.EntityFrameworkCore;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configures one-to-many relationship
            //modelBuilder.Entity<Student>()
            //    .HasRequired<Grade>(s => s.CurrentGrade)
            //    .WithMany(g => g.Students)
            //    .HasForeignKey<int>(s => s.CurrentGradeId);

            // configures one-to-many relationship
            modelBuilder.Entity<Customer>()
                        .HasMany(g => g.Addresses)
                        .WithOne(s => s.Customer)
                        .HasForeignKey(s => s.CustomerId);

            modelBuilder.Entity<Customer>()
                      .HasMany(g => g.Contacts)
                      .WithOne(s => s.Customer)
                      .HasForeignKey(s => s.CustomerId);
        }
    }

}

