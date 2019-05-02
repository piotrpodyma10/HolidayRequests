using HolidayRequests.Data;
using HolidayRequests.Data.Data;
using HolidayRequests.Requests;
using HolidayRequests.ViewModels.Employee;
using HolidayRequests.ViewModels.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HolidayRequests.Controllers
{
    public class UsersController : Controller
    {
        private readonly HolidayRequestsContext _context;

        public UsersController(HolidayRequestsContext context)
        {
            _context = context;
        }

        [HttpGet("GetUsers")]
        public ActionResult<IEnumerable<UserViewModel>> GetUsers()
        {
            var response = _context.Users;

            return Ok(response);
        }

        [HttpGet("GetUserById")]
        public ActionResult<IEnumerable<EmployeeViewModel>> GetUserById(int id)
        {
            var response = _context.UserRoles
                    .Include(r => r.Role)
                    .Include(e => e.Employee)
                    .Include(u => u.Employee.User)
                    .Include(c => c.Employee.Department)
                    .Where(u => u.Employee.UserId == id)
                    .Select(x => new EmployeeViewModel
                    {
                        Id = x.EmployeeId,
                        FirstName = x.Employee.FirstName,
                        LastName = x.Employee.LastName,
                        Role = x.Role.Name,
                        ActualLeaveDaysNumber = x.Employee.ActualLeaveDaysNumber,
                        LeaveDaysPerYear = x.Employee.LeaveDaysPerYear,
                        DepartmentName = x.Employee.Department.Name,
                        Email = x.Employee.User.Email,
                        DepartmentTitle = "Department",
                        ModalTitle = "Take a day off!",
                        UserTitle = "Username",
                        ActualLeaveDaysTitle = "Your remaining days off",
                        RoleTitle = "Role in our company"

                    })
                    .FirstOrDefault();

            return Ok(response);
        }

        [HttpPost("AddNewUser")]
        public IActionResult CreateNewUser([FromBody] UserRequest userRequest)
        {
            _context.Users.Add(new User
            {
                Email = userRequest.email,
                Password = userRequest.password
            });

            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("LogInUser")]
        public EmployeeViewModel LogInToApp([FromBody] UserRequest userRequest)
        {
            try
            {
                var findUser = _context.Users
                    .Where(e => e.Email == userRequest.email && e.Password == userRequest.password).FirstOrDefault();


                if(findUser == null)
                {
                    return new EmployeeViewModel();
                }

                return _context.UserRoles
                    .Include(r => r.Role)
                    .Include(e => e.Employee)
                    .Include(u => u.Employee.User)
                    .Include(c => c.Employee.Department)
                    .Where(u => u.Employee.UserId == findUser.Id)
                    .Select(x => new EmployeeViewModel
                    {
                        Id = x.EmployeeId,
                        FirstName = x.Employee.FirstName,
                        LastName = x.Employee.LastName,
                        Role = x.Role.Name,
                        ActualLeaveDaysNumber = x.Employee.ActualLeaveDaysNumber,
                        LeaveDaysPerYear = x.Employee.LeaveDaysPerYear,
                        DepartmentName = x.Employee.Department.Name,
                        Email = x.Employee.User.Email
                    })
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
