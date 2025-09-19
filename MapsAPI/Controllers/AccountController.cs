using MapsAPI.Dto;
using MapsAPI.Interfaces;
using MapsAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MapsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService userService)
        {
            _accountService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var user = await _accountService.RegisterUserAsync(request);

            if (user is null)
            {
                return BadRequest("User already exists.");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(UserDto request)
        {
            var response = await _accountService.LoginAsync(request);

            if (response is null)
            {
                return BadRequest("Invalid username and/or password.");
            }

            return Ok(response);
        }
    }
}
