using HolidayRequests.Data;
using HolidayRequests.Data.Data;
using HolidayRequests.Requests.LeaveRequest;
using HolidayRequests.ViewModels.LeaveRequest;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<IEnumerable<LeaveRequestViewModel>> GetLeaveRequestByUser(LeaveRequestByUserRequest request)
        {
            try
            {
                var leaveRequests = _context.LeaveRequests.Where(l => l.Id == request.Id);

                return Ok(leaveRequests);
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
                        ApproverId = request.ApproverId
                    });

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
                var findLeaveRequest = _context.LeaveRequests.Where(e => e.Id == request.Id).FirstOrDefault(); ;

                if (findLeaveRequest != null)
                {
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

