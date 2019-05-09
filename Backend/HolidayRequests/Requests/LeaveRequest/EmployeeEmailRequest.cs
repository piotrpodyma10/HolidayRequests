using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Requests.LeaveRequest
{
    public class EmployeeEmailRequest
    {
        public string Name { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string DaysOff { get; set; }
    }
}
