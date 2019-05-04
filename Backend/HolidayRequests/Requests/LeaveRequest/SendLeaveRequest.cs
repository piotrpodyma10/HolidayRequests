using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Requests.LeaveRequest
{
    public class SendLeaveRequest
    {
        public int EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Boolean IsPayed { get; set; }
        public int DaysOff { get; set; }
        public int ApproverId { get; set; }
    }
}
