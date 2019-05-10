using HolidayRequests.Data;
using HolidayRequests.Data.Data;
using HolidayRequests.Requests;
using HolidayRequests.Requests.Employee;
using HolidayRequests.ViewModels.Employee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly HolidayRequestsContext _context;

        public EmployeesController(HolidayRequestsContext context)
        {
            _context = context;
        }

        [HttpGet("GetEmployees")]
        public ActionResult<IEnumerable<EmployeeViewModel>> GetEmployees()
        {
            try
            {
                var employees = _context.Employees;

                return Ok(employees);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetEmployeeById")]
        public ActionResult<EmployeeViewModel> GetEmployees(GetEmployeeRequest request)
        {
            try
            {
                var employee = _context.Employees.Where(e => e.Id == request.Id);

                return Ok(employee);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetAllEmployees")]
        public ActionResult<IEnumerable<List<string>>> GetAllEmployees()
        {
            try
            {
                var employee = _context.Employees
                    .Join(_context.UserRoles, x => x.Id, y => y.EmployeeId, (x, y) => new
                    {
                        name = x.FirstName + " " + x.LastName,
                        actualDaysOff = x.ActualLeaveDaysNumber,
                        setDaysOff = x.LeaveDaysPerYear,
                        role = y.Role.Name,
                        roleId = y.Role.Id,
                        departmentName = x.Department.Name,
                        departmentId = x.Department.Id,
                        employeeId = x.Id
                    }).ToList();

                return Ok(employee);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Authorize(Roles = "Administrator, HR-Manager")]
        [HttpPost("AddNewEmployee")]
        public IActionResult AddNewEmployee ([FromBody] NewEmployeeRequest request)
        {
            try
            {
                _context.Employees.Add(
                    new Employee
                    {
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        DepartmentId = request.DepartmentId,
                        UserId = request.UserId,
                        LeaveDaysPerYear = request.LeaveDaysPerYear,
                        ActualLeaveDaysNumber = request.ActualLeaveDaysNumber
                    });

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("EditEmployee")]
        public IActionResult EditEmployee([FromBody] EditEmployeeRequest request)
        {
            try
            {
                var findEmployee = _context.Employees.Where(e => e.Id == request.Id).FirstOrDefault();
                var employeeRole = _context.UserRoles.Where(e => e.EmployeeId == request.Id).FirstOrDefault();

                if (findEmployee != null && employeeRole != null)
                {
                    var employeeName = request.EmployeeName.Split(" ");
                    var firstName = employeeName[0];
                    var lastName = employeeName[1];

                    findEmployee.FirstName = firstName;
                    findEmployee.LastName = lastName;
                    findEmployee.LeaveDaysPerYear = request.LeaveDaysPerYear;
                    findEmployee.ActualLeaveDaysNumber = request.ActualLeaveDaysNumber;
                    findEmployee.DepartmentId = request.DepartmentId;

                    if (employeeRole.RoleId != request.RoleId)
                    {
                        _context.UserRoles.Remove(employeeRole);
                        _context.SaveChanges();
                        _context.UserRoles.Add(new UserRole
                        {
                            EmployeeId = request.Id,
                            RoleId = request.RoleId
                        });
                    }

                    _context.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
                
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("DeleteEmployee")]
        public IActionResult DeleteEmployee([FromBody] DeleteEmployeeRequest request)
        {
            try
            {
                var findEmployee = _context.Employees.Where(e => e.Id == request.Id).FirstOrDefault(); ;

                if (findEmployee != null)
                {
                    _context.Employees.Remove(findEmployee);
                    _context.SaveChanges();
                }
                else
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("ChangeNumberOfActualLeaveDays")]
        public IActionResult ChangeNumberOfActualLeaveDays([FromBody] ChangeNumberOfActualLeaveDaysRequest request)
        {
            try
            {
                var findEmployee = _context.Employees.Where(e => e.Id == request.Id).FirstOrDefault();

                if (findEmployee != null)
                {
                    findEmployee.ActualLeaveDaysNumber = request.ActualLeaveDaysNumber;
                    _context.SaveChanges();
                }
                else
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
