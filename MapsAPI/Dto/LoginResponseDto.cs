namespace MapsAPI.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public Guid UserId { get; set; }
        public string Username { get; set; }
    }
}
