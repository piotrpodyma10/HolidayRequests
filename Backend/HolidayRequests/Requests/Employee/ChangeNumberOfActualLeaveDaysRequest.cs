using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Requests
{
    public class ChangeNumberOfActualLeaveDaysRequest
    {
        public int Id { get; set; }
        public int ActualLeaveDaysNumber { get; set; }
    }
}
