import React, { useState, useRef, useEffect } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import Coin from "../../assets/coin.png";
import CoinBlue from "../../assets/coinBlue24.png";

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
  const [isOpenNumer, setIsOpenNumer] = useState(null);

  const { activeDataList, completedTasks, tasks } = props;

  const wrapper = useRef(null);

  useEffect(() => {
    const fetchMerkersList = props.tasks.data.map((task) => {
      const { lat, lng } = task.location;
      if (task.id === activeDataList) wrapper.current.panTo({ lat, lng });
      const coin = task.id <= completedTasks ? CoinBlue : Coin;
      const label =
        task.id <= completedTasks ? "" : { text: `${task.id}`, color: "#fff" };
      onLineDataList((prev) =>
        prev.length < tasks.data.length ? [...prev, task.location] : prev
      );

      return (
        <Marker
          key={task.id}
          position={{ lat, lng }}
          icon={coin}
          label={label}
          onClick={() =>
            setIsOpenNumer((prev) => (prev !== task.id ? task.id : null))
          }
        >
          {task.id === isOpenNumer && (
            <InfoBox
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
              defaultPosition={task.location}
            >
              <div
                onClick={() => setIsOpenNumer(null)}
                style={{
                  backgroundColor: `white`,
                  opacity: 0.75,
                  padding: `5px 5px`,
                  border: "1px solid #000",
                  borderRadius: "5px",
                }}
              >
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  {task.description}
                </div>
              </div>
            </InfoBox>
          )}
        </Marker>
      );
    });
    setMarkerList(fetchMerkersList);
  }, [activeDataList, completedTasks, setMarkerList, wrapper, isOpenNumer]);

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
      completedTasks={props.completedTasks}
    />
  );
};

export default Maps;
