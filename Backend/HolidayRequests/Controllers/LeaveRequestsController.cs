using HolidayRequests.Data;
using HolidayRequests.Data.Data;
using HolidayRequests.Requests.LeaveRequest;
using HolidayRequests.ViewModels.LeaveRequest;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidayRequests.Controllers
{
    public class LeaveRequestsController : Controller
    {
        private readonly HolidayRequestsContext _context;

        public LeaveRequestsController(HolidayRequestsContext context)
        {
            _context = context;
        }

        [HttpGet("GetLeaveRequestByUser")]
        public ActionResult<IEnumerable<LeaveRequestViewModel>> GetLeaveRequestByUser(LeaveRequestsByUserRequest request)
        {
            try
            {
                var leaveRequests = _context.LeaveRequests
                    .Where(l => l.EmployeeId == request.Id)
                    .Join(_context.Employees, x => x.ApproverId, z => z.Id, (x, y) => new
                    {
                        LeaveRequest = x,
                        Employee = y
                    })
                    .Join(_context.UserRoles, x => x.Employee.Id, y => y.EmployeeId, (x, y) => new LeaveRequestViewModel
                    {
                        RequestId = x.LeaveRequest.Id,
                        StartDate = x.LeaveRequest.StartDate.Date.ToString(),
                        EndDate = x.LeaveRequest.EndDate != null ? x.LeaveRequest.EndDate.ToString().Substring(0,10) : "-",
                        DaysOff = x.LeaveRequest.DaysOff,
                        Status = x.LeaveRequest.Status,
                        ApproverName = x.Employee.FirstName + " " + x.Employee.LastName,
                        ApproverRole = y.Role.Name,
                        Actions = x.LeaveRequest.Status != "Open" ? false : true 
                    });

                return Ok(leaveRequests);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetOpenLeaveRequest")]
        public ActionResult<IEnumerable<ListOpenLeaveRequestsViewModel>> GetOpenLeaveRequest(LeaveRequestsByUserRequest request)
        {
            try
            {
                var leaveRequests = _context.LeaveRequests
                    .Where(l => l.ApproverId == request.Id && l.Status == "Open")
                    .Join(_context.Employees, x => x.EmployeeId, z => z.Id, (x, y) => new
                    {
                        LeaveRequest = x,
                        Employee = y
                    })
                    .Join(_context.UserRoles, x => x.Employee.Id, y => y.EmployeeId, (x, y) => new OpenLeaveRequestsViewModel
                    {
                        EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                        EmployeeRole = y.Role.Name,
                        StartDate = x.LeaveRequest.StartDate.Date.ToString(),
                        EndDate = x.LeaveRequest.EndDate != null ? x.LeaveRequest.EndDate.ToString().Substring(0, 10) : "-",
                        DaysOff = x.LeaveRequest.DaysOff,
                        RequestId = x.LeaveRequest.Id,
                        DepartmentName = x.Employee.Department.Name
                    }).ToList();

                var allRequests = new ListOpenLeaveRequestsViewModel
                {
                    NumberOfRequests = leaveRequests.Count(),
                    OpenLeaveRequests = leaveRequests
                };

                return Ok(allRequests);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("SendLeaveRequest")]
        public IActionResult SendLeaveRequest([FromBody] SendLeaveRequest request)
        {
            try
            {
                _context.LeaveRequests.Add(
                    new LeaveRequest
                    {
                        EmployeeId = request.EmployeeId,
                        StartDate = request.StartDate,
                        EndDate = request.EndDate,
                        IsPayed = request.IsPayed,
                        Status = "Open",
                        DaysOff = request.DaysOff,
                        ApproverId = request.ApproverId
                    });

                var allDaysOff = _context.Employees.Where(x => x.Id == request.EmployeeId).FirstOrDefault();
                allDaysOff.ActualLeaveDaysNumber = allDaysOff.ActualLeaveDaysNumber - request.DaysOff;
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("EditLeaveRequest")]
        public IActionResult EditLeaveRequest([FromBody] EditLeaveRequest request)
        {
            try
            {
                var findLeaveRequest = _context.LeaveRequests.Where(e => e.Id == request.Id).FirstOrDefault();

                if (findLeaveRequest != null)
                {
                    findLeaveRequest.StartDate = request.StartDate;
                    findLeaveRequest.EndDate = request.EndDate;
                    findLeaveRequest.IsPayed = request.IsPayed;
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

        [HttpDelete("DeleteLeaveRequest")]
        public IActionResult DeleteLeaveRequest([FromBody] DeleteLeaveRequest request)
        {
            try
            {
                var findLeaveRequest = _context.LeaveRequests.Where(e => e.Id == request.Id).FirstOrDefault();

                if (findLeaveRequest != null)
                {
                    var actualLeaveDays = _context.Employees.Where(x => x.Id == findLeaveRequest.EmployeeId).FirstOrDefault().ActualLeaveDaysNumber;
                    var employee = _context.Employees.Where(x => x.Id == findLeaveRequest.EmployeeId).FirstOrDefault();
                    employee.ActualLeaveDaysNumber = employee.ActualLeaveDaysNumber + findLeaveRequest.DaysOff;
                    _context.LeaveRequests.Remove(findLeaveRequest);
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

        [HttpPost("AcceptLeaveRequest")]
        public IActionResult AcceptLeaveRequest([FromBody] AcceptLeaveRequest request)
        {
            try
            {
                var findLeaveRequest = _context.LeaveRequests.Where(l => l.Id == request.LeaveRequestId).FirstOrDefault();

                if (findLeaveRequest != null)
                {
                    findLeaveRequest.Status = "Accepted";
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

        [HttpPost("RejectLeaveRequest")]
        public IActionResult RejectLeaveRequest([FromBody] RejectLeaveRequest request)
        {
            try
            {
                var findLeaveRequest = _context.LeaveRequests.Where(l => l.Id == request.LeaveRequestId).FirstOrDefault();

                if (findLeaveRequest != null)
                {
                    findLeaveRequest.Status = "Rejected";
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

