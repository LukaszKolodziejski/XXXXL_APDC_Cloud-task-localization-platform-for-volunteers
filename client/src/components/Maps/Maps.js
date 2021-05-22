import React, { useState, useRef } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";

const myKeyAPI = "AIzaSyB4r-FZ9lWpfLIYkjUjHyOthNeyyMpXJpg";
const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${myKeyAPI}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [markerList, onMarkerList] = useState([]);
  const [lineDataList, onLineDataList] = useState([]);

  const wrapper = useRef(null);
  return (
    <GoogleMap
      ref={wrapper}
      defaultZoom={12}
      defaultCenter={{ lat: 38.7042128, lng: -9.2138334 }}
      onClick={(e) => {
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        onMarkerList((prev) => [
          ...prev,
          <Marker
            position={e.latLng}
            label={`${markerList.length}`}
            icon={
              <div
                className={{ height: "20px", width: "20px", color: "#555" }}
              ></div>
            }
          />,
        ]);
        onLineDataList((prev) => [...prev, e.latLng]);
        // onMarkerList((prev) => console.log(prev));

        wrapper.current.panTo(e.latLng);
      }}
    >
      {props.isMarkerShown && (
        <>
          {markerList}
          {/* <Marker position={{ lat: 38.7027558, lng: -9.1935418 }} />
          <Marker position={{ lat: 38.7137558, lng: -9.1535418 }} /> */}
          <Polyline path={lineDataList} />
        </>
      )}
    </GoogleMap>
  );
});

const Maps = (props) => {
  return <MyMapComponent isMarkerShown />;
};

export default Maps;
