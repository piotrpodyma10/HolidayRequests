using HolidayRequests.Data.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HolidayRequests.Data
{
    public static class DbInitializer
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<HolidayRequestsContext>();
            context.Database.Migrate();

            if (!context.Departments.Any())
            {
                context.AddRange(new List<Department>()
                {
                    new Department() { Name = "IT" },
                    new Department() { Name = "HR" },
                    new Department() { Name = "Sales" },
                    new Department() { Name = "Marketing" },
                    new Department() { Name = "Management" }
                });
                context.SaveChanges();
            }

            if(!context.Users.Any())
            {
                context.AddRange(new List<User>()
                {
                    new User() { Email = "kowalski@company.com", Password = "12345" },
                    new User() { Email = "akos@company.com", Password = "12345" },
                    new User() { Email = "markowska@company.com", Password = "12345" },
                    new User() { Email = "kowalek@company.com", Password = "12345" },
                    new User() { Email = "bednarz@company.com", Password = "12345" },
                    new User() { Email = "bednarek@company.com", Password = "12345" },
                    new User() { Email = "koziol@company.com", Password = "12345" },
                    new User() { Email = "zwolenik@company.com", Password = "12345" },
                });
                context.SaveChanges();
            }

            if (!context.Employees.Any())
            {
                context.AddRange(new List<Employee>()
                {
                    new Employee() { FirstName = "Mariusz", LastName = "Kowalski", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 1, UserId = 1 },
                    new Employee() { FirstName = "Orban", LastName = "Akos", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 1, UserId = 2 },
                    new Employee() { FirstName = "Monika", LastName = "Markowska", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 2, UserId = 3 },
                    new Employee() { FirstName = "Grzegorz", LastName = "Kowalek", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 2, UserId = 4 },
                    new Employee() { FirstName = "Beata", LastName = "Bednarz", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 2, UserId = 5 },
                    new Employee() { FirstName = "Bartosz", LastName = "Bednarek", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 1, UserId = 6 },
                    new Employee() { FirstName = "Martyna", LastName = "Koziol", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 3, UserId = 7 },
                    new Employee() { FirstName = "Bartosz", LastName = "Bednarek", ActualLeaveDaysNumber = 20, LeaveDaysPerYear = 20, DepartmentId = 4, UserId = 8 },
                });
                context.SaveChanges();
            }

            if (!context.Roles.Any())
            {
                context.AddRange(new List<Role>()
                {
                    new Role() { Name = "Employee" },
                    new Role() { Name = "Manager" },
                });
                context.SaveChanges();
            }

            if (!context.UserRoles.Any())
            {
                context.AddRange(new List<UserRole>()
                {
                    new UserRole() { EmployeeId = 1, RoleId = 1 },
                    new UserRole() { EmployeeId = 2, RoleId = 2 },
                    new UserRole() { EmployeeId = 3, RoleId = 1 },
                    new UserRole() { EmployeeId = 4, RoleId = 1 },
                    new UserRole() { EmployeeId = 5, RoleId = 2 },
                    new UserRole() { EmployeeId = 6, RoleId = 1 },
                    new UserRole() { EmployeeId = 7, RoleId = 2 },
                    new UserRole() { EmployeeId = 8, RoleId = 2 },
                });
                context.SaveChanges();
            }
        }
    }
}
