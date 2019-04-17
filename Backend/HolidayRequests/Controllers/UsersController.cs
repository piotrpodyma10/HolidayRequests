using HolidayRequests.Data;
using HolidayRequests.Data.Data;
using HolidayRequests.Requests;
using HolidayRequests.ViewModels.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public IActionResult LogInToApp([FromBody] UserRequest userRequest)
        {
            try
            {
                var findUser = _context.Users
                    .Where(e => e.Email == userRequest.email && e.Password == userRequest.password).FirstOrDefault();


                if(findUser == null)
                {
                    return Ok("Simple text");
                }

                return Ok(findUser);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
