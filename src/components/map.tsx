import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';

type Offer = {
  id: string;
  title: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

type MapProps = {
  offers: Offer[];
};

const Map = ({ offers }: MapProps) => {
  const AMSTERDAM_COORDS: [number, number] = [52.3676, 4.9041];


  const mapSettings = useMemo(() => ({
    center: AMSTERDAM_COORDS,
    zoom: 12,
  }), []);

  return (
    <MapContainer
      key={JSON.stringify(mapSettings)}
      center={mapSettings.center}
      zoom={mapSettings.zoom}
      className="cities__map"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.location.latitude, offer.location.longitude]}
        >
          <Popup>{offer.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
