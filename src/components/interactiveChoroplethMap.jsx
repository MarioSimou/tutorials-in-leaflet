import React from 'react'
import {
  Map,
  TileLayer,
  GeoJSON,
  useLeaflet
} from 'react-leaflet'
import states from './data/states.json'

const getColor = (d) => {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

const onStyleAdd = feature => {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  }
}
const onClickEvent = ({target}) => target._map?.fitBounds(target.getBounds())
const onMouseOverEvent = ({info, props}) => ({target}) => {
  target.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })
  console.log(info())
}

const onMouseLeaveEvent = geoJSON => ({target})=> geoJSON().leafletElement.resetStyle(target)
const onEachFeature = ({ geoJSON, info }) => (feature, layer ) => {
  layer.on({
    click: onClickEvent,
    mouseover: onMouseOverEvent({info, props: feature.properties}),
    mouseout: onMouseLeaveEvent(geoJSON),
  })
}

const CustomScale = (props = { position: "bottomleft" }) => {
  const {map} = useLeaflet()
  React.useEffect(() => {
    const scale = L.control.scale(props)
    map.addControl(scale)
  },[])
  return null
}

const Label = ({setInfo}) => {
  const {map} = useLeaflet()
  React.useEffect(() => {
    const info = L.control();
    
    info.onAdd = function(){
      const div = document.createElement("div")
      div.classList.add("info")
      this._div = div  
      this.update()
      return div
    }

    info.update = function(props = {} ){
      console.log(props)
      this._div.innerHTML = props.name ? `<h3>${props.name}</h3>` : "Hover over a state"
    }
    setInfo(info)
    map.addControl(info)
  }, [])

  return null
}

const updateInfo = info => props => info?.update(props)

const Component = () => {
  const geoJSONref = React.useRef()
  const onAddGeoJSON = ({target}) => target._map?.fitBounds(target.getBounds())
  const [info,setInfo ] = React.useState({})
  console.log("info: ", info)
  return (
    <Map center={[0,0]} zoom={13} id="map" >
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <GeoJSON data={states} 
             onAdd={onAddGeoJSON} 
             style={onStyleAdd} 
             onEachFeature={onEachFeature({
               geoJSON: () => geoJSONref.current,
               info: () => info,
             })} 
             ref={geoJSONref}
             />
    <CustomScale />
    <Label setInfo={setInfo} />
    </Map>
  )
}

export default Component