import React from 'react'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet'
import leafletIcon from './icons/leaflet-icon.png'
import mapPointer from './icons/map-pointer.png'

const position = [
  51.00,
  0.00,
]


const DefaultIcon = L.Icon.extend({
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
  }
})

const mapIcon = new DefaultIcon({shadowUrl: mapPointer, iconUrl: mapPointer})
const leafleIcon = new DefaultIcon({shadowUrl: leafletIcon, iconUrl: leafletIcon})

const Component = () => {
  return (
    <Map center={position} zoom={13} id="map">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={mapIcon}/>
        <Marker position={[52.0,0]} icon={leafleIcon}/>
    </Map>
  )
}

export default Component