using System;
using System.Collections.Generic;

namespace MapsAPI.Models;

public partial class Location
{
    public Guid LocationId { get; set; }

    public Guid? MapId { get; set; }

    public double Lat { get; set; }

    public double Lng { get; set; }

    public string? Country { get; set; }

    public virtual Map? Map { get; set; }
}
