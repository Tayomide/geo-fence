import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { Loader } from "@googlemaps/js-api-loader"
import AppContext from "../hooks/AppContext";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

const GoogleMap = () => {
  // user, polygon
  // change modal to only appear when session is out, display signup/login instead.
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  const mapRef = useRef()
  const mapDivRef = useRef()
  const mapsRef = useRef()
  const loader = new Loader({
    apiKey: import.meta.env.VITE_REACT_GOOGLE_MAP_API,
    version: "weekly",
    libraries: ["maps", "marker", "drawing"]
  })
  const [editPoints, setEditPoints] = useState([])
  const editPolygon = useRef()
  const drawingManager = useRef()
  const drawnPolygons = useRef([])
  const [polygons, setPolygons] = useState([])
  const [updated, setUpdated] = useState(false)
  const { token } = useContext(AppContext)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
  
    fetch(import.meta.env.VITE_REACT_SERVER_URI + "/polygon", requestOptions)
    .then(res => res.json())
    .then(res => {
      console.log("Console", res)
      setPolygons([])
      res.map(polygon => {
        const coordinates = []
        polygon.coordinates[0].map(coord => {
          coordinates.push({
            lat: coord[0],
            lng: coord[1]
          })
        })
        setPolygons(prevPolygons => {
          return [...prevPolygons, {
            coordinates: coordinates,
            type: polygon.type,
            id: polygon.id
          }]
        })
      })
    })
  }, [])

  useEffect(() => {
    if(mapDivRef.current){
      loader.importLibrary('maps')
      .then((maps) => {
        mapsRef.current = maps
        initMaps()
      })
      .catch(e => console.error(e))
      loader.importLibrary("drawing")
      .then((drawing) => {
        drawingManager.current = new drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              drawing.OverlayType.MARKER,
              drawing.OverlayType.POLYGON,
              drawing.OverlayType.RECTANGLE,
            ],
          },
          markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          },
          // circleOptions: {
          //   fillColor: "#ffff00",
          //   fillOpacity: 1,
          //   strokeWeight: 5,
          //   clickable: false,
          //   editable: true,
          //   zIndex: 1,
          // },
        });
        drawingManager.current.setMap(mapRef.current);
        google.maps.event.addListener(drawingManager.current, 'polygoncomplete', function(polygon) {
          setPolygons(prevPolygons => {
            const newPolygon = polygon
            .latLngs
            .g
            .map(polygon => polygon
              .g
              .map(coord => coord.toJSON())
            )
            return [...prevPolygons, {
              coordinates: newPolygon[0],
              type: "Polygon"
            }]
          })
          polygon.setMap(null)
          setUpdated(true)
          // Clear and store the new ones
          // Find a way to delete polygons and add it to the custom controls
          // Then format for sending
        });
      })
    }
    return () => {
      drawingManager.current?.setMap(null)
    }
  }, [])

  useEffect(() => {
    console.log(polygons)
    if(polygons.length && mapsRef.current){
      for(const polygon of drawnPolygons.current){
        polygon.setMap(null)
      }
      drawnPolygons.current = []
      let i = 0
      for(const polygon of polygons){
        drawnPolygons.current[i] = new mapsRef.current.Polygon({
          path: polygon.coordinates,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        })
        drawnPolygons.current[i].setMap(mapRef.current)
        i++
      }
    }
  }, [polygons])

  useEffect(() => {
    if(editPoints.length > 2 && mapsRef.current){
      editPolygon.current?.setMap(null)
      editPolygon.current = new mapsRef.current.Polygon({
        path: editPoints,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      })
      editPolygon.current.setMap(mapRef.current)
    }
  }, [editPoints])

  const initMaps = () => {
    mapRef.current = new mapsRef.current.Map(mapDivRef.current, {
      center,
      zoom,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      }
    })
    mapRef.current.addListener("click", (e) => {
      setEditPoints(prevEditPoints => [...prevEditPoints, e.latLng.toJSON()])
    })
  }

  const save = () => {
    if(!updated) return
    for(const polygon of polygons){
      polygon.coordinates = [polygon.coordinates.map(coordinate => [coordinate.lat, coordinate.lng])
      ]
    }
    
    const body = JSON.stringify({
      polygons
    })
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: body
    };
  
    fetch(import.meta.env.VITE_REACT_SERVER_URI + "/polygon", requestOptions)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setUpdated(false)
    })
    .catch(err => console.log(err))
  }

  return (
    <Container>
      {/* <Wrapper apiKey={import.meta.env.VITE_REACT_GOOGLE_MAP_API} render={render}> */}
        <div ref={mapDivRef} id="map" />
        <div className="extra-controls">
          <button
            className={!updated ? "disabled" : ""}
            onClick={save}
          >Save</button>
        </div>
      {/* </Wrapper> */}
    </Container>
  )
}

export default GoogleMap

const Container = styled.div`
  #map{
    width: calc(100% - 4em);
    height: 70vh;
    margin: 0 auto;
    border-radius: 0.3em;
  }
  .extra-controls{
    display: flex;
    padding: 1em 2em;
    button{
      border: 0;
      outline: 0;
      padding: 0.8em 1em;
      background: #0170ba;
      color: white;
      border-radius: 0.3em;
      cursor: pointer;
      &.disabled{
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  @media screen and (max-width: 768px) {
    #map{
      width: 100%;
      border-radius: 0;
    }
    .extra-controls{
      padding: 1em;
    }
  }
`