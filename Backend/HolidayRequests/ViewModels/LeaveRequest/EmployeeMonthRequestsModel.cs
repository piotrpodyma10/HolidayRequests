using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.ViewModels.LeaveRequest
{
    public class EmployeeMonthRequestsModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Request> Requests { get; set; }
    }

    public class Request
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; }
    }
}
