using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HolidayRequests.Data.Data
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Role ParentRole { get; set; }
        public int? ParentRoleId { get; set; }
    }
}
