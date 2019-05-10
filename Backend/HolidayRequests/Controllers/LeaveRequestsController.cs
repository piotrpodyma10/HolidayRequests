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
using System.Net.Mail;
using System.Net;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace HolidayRequests.Controllers
{
    public class LeaveRequestsController : Controller
    {
        private readonly HolidayRequestsContext _context;
        private IHostingEnvironment _env;

        public LeaveRequestsController(HolidayRequestsContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
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


                var employee = _context.Employees.Where(x => x.Id == request.EmployeeId).FirstOrDefault();
                var employeeEmailData = new EmployeeEmailRequest
                {
                    Name = employee.FirstName + " " + employee.LastName,
                    StartDate = request.StartDate.ToString().Substring(0, 9),
                    EndDate = request.EndDate != null ? request.EndDate.ToString().Substring(0, 9) : "-",
                    DaysOff = request.DaysOff.ToString()
                };

                var fromAddress = new MailAddress("snowy2night@gmail.com", "Holiday request app");
                var toAddress = new MailAddress("gooddayis2day@gmail.com", "To Name");
                const string fromPassword = "snow!123";
                const string subject = "Leave request information";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = CreateBody(employeeEmailData),
                    IsBodyHtml = true
                })
                {
                    smtp.Send(message);
                }

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string CreateBody(EmployeeEmailRequest employee)
        {
            string body = string.Empty;
            var webRoot = _env.WebRootPath.Substring(0, _env.WebRootPath.Length-8);
            var file = System.IO.Path.Combine(webRoot, "EmailTemplates/SendRequest.html");
            using (StreamReader reader = new StreamReader(file))
            {
                body = reader.ReadToEnd();
            }

            body = body.Replace("{employeeName}", employee.Name);
            body = body.Replace("{startDate}", employee.StartDate);
            body = body.Replace("{endDate}", employee.EndDate);
            body = body.Replace("{daysOff}", employee.DaysOff);

            return body;
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
                var employee = _context.Employees.Where(l => l.Id == findLeaveRequest.EmployeeId).FirstOrDefault();

                if (findLeaveRequest != null && employee != null)
                {
                    employee.ActualLeaveDaysNumber = employee.ActualLeaveDaysNumber + request.DaysOff;
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

        [HttpGet("GetMonthRequests")]
        public ActionResult<IEnumerable<EmployeeMonthRequestsModel>> GetMonthRequests(DateTime date, int departmentId)
        {
            var startDate = new DateTime(date.Year, date.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            try
            {
                var idToEmployee = _context.Employees.Where(e => e.DepartmentId == departmentId).ToDictionary(e => e.Id, e => e);

                var leaveRequests = _context.LeaveRequests
                                                .Where(l => ((startDate <= l.StartDate && l.StartDate <= endDate)
                                                                || (startDate <= l.EndDate && l.EndDate <= endDate)))
                                                .ToList();

                var employeeIdToMonthRequests = new Dictionary<int, EmployeeMonthRequestsModel>();
                foreach (var item in idToEmployee)
                {
                    employeeIdToMonthRequests.Add(item.Key, new EmployeeMonthRequestsModel
                    {
                        FirstName = item.Value.FirstName,
                        LastName = item.Value.LastName,
                        Requests = new List<Request>()
                    });
                }

                foreach (var item in leaveRequests)
                {
                    if (!employeeIdToMonthRequests.ContainsKey(item.EmployeeId)) continue;
                    employeeIdToMonthRequests[item.EmployeeId].Requests.Add(new Request{
                        StartDate = item.StartDate,
                        EndDate = item.EndDate,
                        Status = item.Status
                    });
                }
                return Ok(employeeIdToMonthRequests.Values);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

