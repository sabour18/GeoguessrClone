using MapsAPI.Interfaces;
using MapsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace MapsAPI.Services
{
    public class MapsService : IMapsService
    {
        private readonly MapsContext _dbContext;

        public MapsService(MapsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Location> GetLocationByMapId(Guid mapId)
        {
            return _dbContext.Locations
                .Where(l => l.MapId == mapId).ToList();
        }

        public async Task<IEnumerable<Map>> GetMapsAsync()
        {
            return await _dbContext.Maps.ToListAsync();
        }

        public IEnumerable<Location> GetNumberLocations(Guid mapId, int rounds)
        {
            var randomLocs = _dbContext.Locations
            .Where(l => l.MapId == mapId)
            .OrderBy(x => Guid.NewGuid())
            .Take(rounds)
            .ToList();

            return randomLocs;
        }
    }
}
