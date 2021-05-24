import React, { useState, useRef } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import Coin from "../../assets/coin.png";

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
      defaultCenter={{ lat: 38.7142128, lng: -9.1838334 }}
      onClick={(e) => {
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        onMarkerList((prev) => [
          ...prev,
          <Marker
            key={markerList.length + 1}
            position={e.latLng}
            label={{ text: `${markerList.length + 1}`, color: "#fff" }}
            icon={Coin}
          />,
        ]);
        onLineDataList((prev) => [...prev, e.latLng]);

        wrapper.current.panTo(e.latLng);
      }}
    >
      {props.isMarkerShown && (
        <>
          {markerList}
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
