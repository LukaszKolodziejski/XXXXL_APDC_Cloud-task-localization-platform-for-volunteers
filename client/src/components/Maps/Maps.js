import React, { useState, useRef, useEffect } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import CoinBlue24 from "../../assets/coinBlue24.png";
import CoinBlue32 from "../../assets/coinBlue32.png";
import CoinGold24 from "../../assets/coinGold24.png";
import CoinGold32 from "../../assets/coinGold32.png";
import CoinRed24 from "../../assets/coinRed24.png";
import CoinRed32 from "../../assets/coinRed32.png";

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
  const { activeDataList } = props;

  const wrapper = useRef(null);

  useEffect(() => {
    const fetchMerkersList = props.tasks.map((task) => {
      const { lat, lng } = task.location;
      if (task.id === activeDataList) wrapper.current.panTo({ lat, lng });

      let coin = task.id === activeDataList ? CoinGold32 : CoinGold24;
      if (task.status === "INPROGRESS") coin = CoinBlue24;
      if (task.status === "INPROGRESS" && task.id === activeDataList)
        coin = CoinBlue32;
      if (task.status === "DONE") coin = CoinRed24;
      if (task.status === "DONE" && task.id === activeDataList)
        coin = CoinRed32;

      return <Marker key={task.id} position={{ lat, lng }} icon={coin} />;
    });
    setMarkerList(fetchMerkersList);
  }, [activeDataList, setMarkerList, wrapper]);

  return (
    <GoogleMap
      ref={wrapper}
      defaultZoom={12}
      defaultCenter={{ lat: 38.7142128, lng: -9.1838334 }}
      onClick={(e) => {
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        wrapper.current.panTo(e.latLng);
      }}
    >
      {props.isMarkerShown && <>{markerList}</>}
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
