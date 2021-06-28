import React, { useState, useRef, useEffect } from "react";
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
  const [markerList, setMarkerList] = useState([]);
  const [lineDataList, onLineDataList] = useState([]);

  const { activeDataList } = props;

  const wrapper = useRef(null);

  useEffect(() => {
    console.log(props.tasks);
    const fetchMerkersList = props.tasks.data.map((task) => {
      const { lat, lng } = task.location;
      if (task.id === activeDataList) wrapper.current.panTo({ lat, lng });

      let coin = Coin;
      // let coin = task.id === activeDataList ? CoinGold32 : CoinGold24;
      onLineDataList((prev) => [...prev, task.location]);
      return (
        <Marker
          key={task.id}
          position={{ lat, lng }}
          icon={coin}
          label={{ text: `${task.id}`, color: "#fff" }}
        />
      );
    });
    setMarkerList(fetchMerkersList);
  }, [activeDataList, setMarkerList, wrapper]);

  return (
    <GoogleMap
      ref={wrapper}
      defaultZoom={12}
      // defaultCenter={{ lat: 38.7142128, lng: -9.1838334 }}
      defaultCenter={props.tasks.data[0].location}
      onClick={(e) => wrapper.current.panTo(e.latLng)}
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
  return (
    <MyMapComponent
      isMarkerShown
      tasks={props.tasks}
      activeDataList={props.activeDataList}
    />
  );
};

export default Maps;
