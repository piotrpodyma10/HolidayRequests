using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.ViewModels.LeaveRequest
{
    public class LeaveRequestViewModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Boolean IsPayed { get; set; }
        public string Status { get; set; }
    }
}
