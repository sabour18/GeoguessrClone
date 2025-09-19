using MapsAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace MapsAPI.Interfaces
{
    public interface IMapsService
    {
        Task<IEnumerable<Map>> GetMapsAsync();
        IEnumerable<Location> GetLocationByMapId(Guid mapId);
        IEnumerable<Location> GetNumberLocations(Guid mapId, int rounds);
    }
}
