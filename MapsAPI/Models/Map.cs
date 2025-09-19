using System;
using System.Collections.Generic;

namespace MapsAPI.Models;

public partial class Map
{
    public Guid MapId { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public string? Creator { get; set; }

    public virtual ICollection<Location> Locations { get; set; } = new List<Location>();
}
