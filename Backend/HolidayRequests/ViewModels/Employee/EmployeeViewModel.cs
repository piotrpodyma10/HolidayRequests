using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.ViewModels.Employee
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string UserTitle { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RoleTitle { get; set; }
        public string Role { get; set; }
        public int LeaveDaysPerYear { get; set; }
        public string ActualLeaveDaysTitle { get; set; }
        public int ActualLeaveDaysNumber { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentName { get; set; }
        public string ModalTitle { get; set; }
        public string Email { get; set; }
    }
}
