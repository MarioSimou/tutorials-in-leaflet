import React from 'react'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from 'react-leaflet'


export default () => {
  const position = [51.505, -0.09]
  const onMapClick = ({target, latlng}) => target.flyTo(latlng)
  
  return (
      <Map center={position} zoom={13} id="map" onclick={onMapClick}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <CircleMarker center={[51.508, -0.11]} radius={500} fillColor="red" color="red" >
          <Popup>
            Hello world
          </Popup>
        </CircleMarker>
      </Map>
    )
}