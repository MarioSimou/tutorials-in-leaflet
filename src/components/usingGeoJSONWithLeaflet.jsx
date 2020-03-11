import React from 'react'
import {
  Map,
  TileLayer,
  GeoJSON,
  CircleMarker,
} from 'react-leaflet'
import L from 'leaflet'

const position = [
  51.00,
  0.00,
]

const geojson = {
  type: "Feature",
  properties: {
    name: "Somewhere"
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621]
  }
}

const myLines = [{
  "type": "LineString",
  "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
  "type": "LineString",
  "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

const states = [{
  "type": "Feature",
  "properties": {
    "party": "Republican",
    "show": true,
  },
  "geometry": {
      "type": "Polygon",
      "coordinates": [[
          [-104.05, 48.99],
          [-97.22,  48.98],
          [-96.58,  45.94],
          [-104.03, 45.94],
          [-104.05, 48.99]
      ]]
  }
}, {
  "type": "Feature",
  "properties": {
    "party": "Democrat",
    "show": true
  },
  "geometry": {
      "type": "Polygon",
      "coordinates": [[
          [-109.05, 41.00],
          [-102.06, 40.99],
          [-102.03, 36.99],
          [-109.04, 36.99],
          [-109.05, 41.00]
      ]]
  }
}];


const Component = function() {
  const styleStates = feature => {
    return {
      color: feature.properties.party === "Democrat" ? "blue" : "red"
    }
  }
  const onEachFeatureStates = (feature, layer) => {
    layer.bindPopup(feature.properties.party)
  }
  const pointToLayerStates = e => {
    console.log("point to layer")
  }
  const onFilterStates = (feature,layer) => {
    return feature.properties.show
  }


  return (
    <Map center={position} zoom={13} id="map" ref={e => e.leafletElement.fitWorld()}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON data={states}  
                 style={styleStates} 
                 onEachFeature={onEachFeatureStates} 
                 pointToLayer={pointToLayerStates} 
                 filter={onFilterStates} />
    </Map>
  )
}

export default Component