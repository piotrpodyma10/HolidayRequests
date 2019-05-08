using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.ViewModels.LeaveRequest
{
    public class ListOpenLeaveRequestsViewModel
    {
        public int NumberOfRequests { get; set; }
        public List<OpenLeaveRequestsViewModel> OpenLeaveRequests { get; set; }
    }
}
