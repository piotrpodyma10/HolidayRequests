using HolidayRequests.Data;
using HolidayRequests.Data.Data;
using HolidayRequests.Requests;
using HolidayRequests.ViewModels.Department;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly HolidayRequestsContext _context;

        public DepartmentController(HolidayRequestsContext context)
        {
            _context = context;
        }

        [HttpGet("GetDepartments")]
        public ActionResult<IEnumerable<DepartmentViewModel>> GetDepartments()
        {
            try
            {
                var departments = _context.Departments;

                return Ok(departments);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("AddNewDepartment")]
        public IActionResult AddNewDepartment([FromBody] NewDepartmentRequest request)
        {
            try
            {
                _context.Departments.Add(
                    new Department
                    {
                        Name = request.Name
                    });

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("EditDepartment")]
        public IActionResult EditDepartment([FromBody] EditDepartmentRequest request)
        {
            try
            {
                var findDepartment = _context.Departments.Where(e => e.Id == request.Id).FirstOrDefault();

                if (findDepartment != null)
                {
                    findDepartment.Name = request.Name;
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

        [HttpDelete("DeleteDepartment")]
        public IActionResult DeleteDepartment([FromBody] DeleteDepartmentRequest request)
        {
            try
            {
                var findDepartment = _context.Departments.Where(e => e.Id == request.Id).FirstOrDefault();

                if (findDepartment != null)
                {
                    _context.Departments.Remove(findDepartment);
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
