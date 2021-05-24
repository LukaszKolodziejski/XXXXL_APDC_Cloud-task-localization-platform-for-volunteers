import React, { useState, useRef, useEffect } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Rec24 from "../../assets/rec24.png";
import Rec32 from "../../assets/rec32.png";

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

      return (
        <Marker
          key={task.id}
          position={{ lat, lng }}
          // label={{ text: `${markerList.length + 1}`, color: "#fff" }}
          icon={task.id === activeDataList ? Rec32 : Rec24}
        />
      );
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
