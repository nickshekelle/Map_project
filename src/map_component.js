import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";


export default function Map(){
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1Ijoibmlja3NoZWtlbGxlIiwiYSI6ImNqeW90aWhrODE4Y20zbXA3eGNkZ2JsankifQ.ge-O4WjAvMnMBBo8rBpScw'
        mapStyle="mapbox://styles/nickshekelle/cjyqkb5bz28mq1cof9u8yuk6e"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}>

        </ReactMapGL>
        </div>
  );  
}      
