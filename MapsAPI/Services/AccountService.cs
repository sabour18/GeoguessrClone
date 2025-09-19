using MapsAPI.Dto;
using MapsAPI.Interfaces;
using MapsAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MapsAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly MapsContext _dbContext;
        private readonly IConfiguration _config;

        public AccountService(MapsContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;
        }

        public async Task<User?> RegisterUserAsync(UserDto request)
        {
            if (await _dbContext.Users.AnyAsync(u => u.Username == request.Username))
            {
                return null;
            }

            User user = new User();

            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);

            user.UserId = Guid.NewGuid();
            user.Username = request.Username;
            user.Password = hashedPassword;
            user.CreatedAt = DateTime.UtcNow;

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<LoginResponseDto> LoginAsync(UserDto request)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Username == request.Username);

            if (user == null || user.Username != request.Username)
            {
                return null;
            }
            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.Password, request.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var token = CreateToken(user);

            var response = new LoginResponseDto
            {
                Token = token,
                UserId = user.UserId,
                Username = request.Username,
            };

            return response;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Token"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
