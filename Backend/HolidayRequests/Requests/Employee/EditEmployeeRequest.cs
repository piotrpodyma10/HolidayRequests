using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Requests
{
    public class EditEmployeeRequest
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public int LeaveDaysPerYear { get; set; }
        public int ActualLeaveDaysNumber { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
    }
}
