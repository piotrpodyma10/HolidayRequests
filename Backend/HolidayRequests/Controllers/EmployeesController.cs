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

        [HttpPut("EditEmployee")]
        public IActionResult EditEmployee([FromBody] EditEmployeeRequest request)
        {
            try
            {
                var findEmployee = _context.Employees.Where(e => e.Id == request.Id).FirstOrDefault();

                if (findEmployee != null)
                {
                    findEmployee.FirstName = request.FirstName;
                    findEmployee.LastName = request.LastName;
                    findEmployee.ActualLeaveDaysNumber = request.ActualLeaveDaysNumber;
                    findEmployee.DepartmentId = request.DepartmentId;
                    findEmployee.LeaveDaysPerYear = request.LeaveDaysPerYear;

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
