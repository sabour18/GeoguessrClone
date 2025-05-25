import axios from 'axios';

const API_URL = 'https://localhost:7023/api/maps';

export const getAllMaps = () => axios.get(`${API_URL}/AllMaps`);
export function getLocationsByMapId(mapId) {
  return axios.get(`${API_URL}/locations`, {
    params: {
      mapId: mapId
    }
  });
}
