using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.ViewModels.LeaveRequest
{
    public class LeaveRequestViewModel
    {
        public int RequestId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int DaysOff { get; set; }
        public string Status { get; set; }
        public string ApproverName {get; set; }
        public string ApproverRole { get; set; }
        public Boolean Actions { get; set; }
    }
}
