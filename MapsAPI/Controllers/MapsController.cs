using MapsAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MapsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapsController : ControllerBase
    {
        private readonly IMapsService _mapsService;

        public MapsController(IMapsService mapsService)
        {
            _mapsService = mapsService;
        }

        [Authorize]
        [HttpGet("locations")]
        public IActionResult GetLocationByMapId(Guid mapId)
        {
            var locations = _mapsService.GetLocationByMapId(mapId);

            if (locations == null)
            {
                return BadRequest("Map or locations doesnt exist");
            }

            return Ok(locations);
        }

        [Authorize]
        [HttpGet("AllMaps")]
        public async Task<IActionResult> GetMaps()
        {
            var maps = await _mapsService.GetMapsAsync();
            return Ok(maps);
        }

        [Authorize]
        [HttpGet("locationsx")]
        public IActionResult GetNumberLocations(Guid mapId, int rounds)
        {
            var locations = _mapsService.GetNumberLocations(mapId, rounds);

            if (locations == null)
            {
                return BadRequest("Map or locations doesnt exist");
            }

            return Ok(locations);
        }
    }
}
