using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HolidayRequests.Data.Data
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int LeaveDaysPerYear { get; set; }
        public int ActualLeaveDaysNumber { get; set; }
        public Department Department { get; set; }
        public int DepartmentId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}