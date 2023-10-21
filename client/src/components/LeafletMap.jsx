import { MapContainer, TileLayer, Marker, Popup, Polygon} from "react-leaflet"
import { useContext, useEffect, useState } from "react"
import AppContext from "../hooks/AppContext"

const LeafletMap = () => {
  const position = [51.505, -0.09]
  const zoom = 13
  const { isEditing, editSvg, setEditSvg, svgList, isDeleting, globalPoints, setGlobalPoints, setSvgList} = useContext(AppContext)
  const [map, setMap] = useState()
  // const [map, setMap] = useState()

  const handleClick = (e) => {
    setEditSvg(tempEditSvg => {
      const newEditSvg = [...tempEditSvg]
      newEditSvg.push([e.latlng.lat, e.latlng.lng])
      return newEditSvg
    })
  }

  const isInsidePolygon = (polygon, point) => {
    let count = 0;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (
            ((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) &&
            (point[0] < polygon[i][0] + ((point[1]-polygon[i][1])/(polygon[j][1] - polygon[i][1])*(polygon[j][0] - polygon[i][0])))
        ) {
            count++;
        }
    }
    return count % 2 === 1;
  }

  const isInsideAPolygon = (point) => {
    for(const polygon of svgList){
      let count = 0;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (
            ((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) &&
            (point[0] < polygon[i][0] + ((point[1]-polygon[i][1])/(polygon[j][1] - polygon[i][1])*(polygon[j][0] - polygon[i][0])))
        ) {
            count++;
        }
    }
    if(count % 2 === 1)return true;
    }
    return false
  }

  const handleDelete = (e) => {
    console.log(e)
    for(let i= svgList.length-1; i >= 0; i--){
      if(isInsidePolygon(svgList[i], [e.latlng.lat, e.latlng.lng])){
        setSvgList(prevSvg => {
          const newSvg = JSON.parse(JSON.stringify(prevSvg))
          newSvg.splice(i, 1)
          return newSvg
        })
        break
      }
    }
  }

  const handlePoint = (e) => {
    setGlobalPoints(prevPoint => {
      const newPoints = JSON.parse(JSON.stringify(prevPoint))
      newPoints.points.push([e.latlng.lat, e.latlng.lng])
      return newPoints
    })
  }

  useEffect(() => {
    while(map?._events.click?.length){
      map?._events.click.pop()
    }
    if(isEditing && map){
      map?.on("click", handleClick)
    }
  }, [isEditing])

  useEffect(() => {
    while(map?._events.click?.length){
      map?._events.click.pop()
    }
    if(isDeleting && map){
      map?.on("click", handleDelete)
    }
  }, [isDeleting])

  useEffect(() => {
    console.log(map)
  }, [map])

  useEffect(() => {
    console.log(globalPoints)
    while(map?._events.click?.length){
      map?._events.click.pop()
    }
    if(globalPoints.adding && map){
      map?.on("click", handlePoint)
    }
  }, [globalPoints])

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{height: "100vh", position: "relative"}}
      id="leaflet-map-container"
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        globalPoints.points.map((point, key) => <Marker position={point} key={key}>
        <Popup>
          {isInsideAPolygon(point) ? <>Inside polygon</> : <>
            <p>Outside polygon</p>
          </>}
        </Popup>
      </Marker>)
      }
      <Polygon pathOptions={{color: '#6f8fe1'}} positions={svgList} />
      <Polygon pathOptions={{color: '#e16f83'}} positions={editSvg} />
    </MapContainer>
  )
}

export default LeafletMap