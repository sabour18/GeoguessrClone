using MapsAPI.Dto;
using MapsAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace MapsAPI.Interfaces
{
    public interface IAccountService
    {
        Task<User?> RegisterUserAsync(UserDto request);
        Task<LoginResponseDto> LoginAsync(UserDto request);
    }
}
