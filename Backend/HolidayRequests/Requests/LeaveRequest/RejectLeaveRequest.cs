using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Requests.LeaveRequest
{
    public class RejectLeaveRequest
    {
        public int LeaveRequestId { get; set; }
        public int DaysOff { get; set; }
    }
}
