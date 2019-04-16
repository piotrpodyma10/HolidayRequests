using HolidayRequests.Data.Data;
using Microsoft.EntityFrameworkCore;

namespace HolidayRequests.Data
{
    public class HolidayRequestsContext : DbContext
    {
        public HolidayRequestsContext(DbContextOptions<HolidayRequestsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>()
                .HasKey(up => new { up.EmployeeId, up.RoleId });
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
    }
}