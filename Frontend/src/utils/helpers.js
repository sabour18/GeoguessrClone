export function calcDistance(location1, location2) {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1 = location1.lat;
  const lng1 = location1.lng;
  const lat2 = location2.lat;
  const lng2 = location2.lng;

  // Convert degrees to radians
  const toRadians = (degree) => degree * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round((R * c) * 100) / 100; // Distance in kilometers
}
export function calcScore(distance) {
  return Math.round(1000 * Math.exp(-0.5 * (distance / 2000) ** 2));
}
