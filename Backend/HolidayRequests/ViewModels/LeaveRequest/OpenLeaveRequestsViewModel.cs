using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.ViewModels.LeaveRequest
{
    public class OpenLeaveRequestsViewModel
    {
        public int RequestId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeRole { get; set; }
        public string DepartmentName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int DaysOff { get; set; }
    }
}
