import "./App.css";
import React, { useState } from "react";

function App() {
  const [route, setRoute] = useState({
    route: "",
    stations: [],
  });

  const handleRoute = (e) => {
    setRoute((route) => ({
      ...route,
      route: e.target.value,
    }));
  };

  const enabled =
    route.route &&
    route.stations.every((station) =>
      Object.entries(station).every(([key, value]) =>
        key === "errors" ? Object.values(value).length === 0 : value
      )
    );

  const addStation = () => {
    setRoute((route) => ({
      ...route,
      stations: [
        ...route.stations,
        {
          name: "",
          lat: "",
          lon: "",
          errors: {},
        },
      ],
    }));
  };

  const handleStation = (value, name, key) => {
    setRoute((route) => ({
      ...route,
      stations: route.stations.map((station, i) => {
        if (key === i) {
          station[name] = value;
          let current = route.stations.find(
            (r, index) => r[name] === value && key !== index
          );
          if (current) {
            station.errors[
              name
            ] = `${name} değeri başka bir alanda ${value} değeri ile zaten tanımlanmış.`;
          } else {
            delete station.errors[name];
          }
        }
        return station;
      }),
    }));
  };

  return (
    <>
      <input
        type="text"
        value={route.route}
        onChange={handleRoute}
        placeholder="Güzergah"
      />
      <button onClick={addStation}>Yeni Durak Ekle</button>
      <hr />
      {route.stations.map((route, key) => (
        <div>
          <input
            type="text"
            onChange={(e) => handleStation(e.target.value, "name", key)}
            placeholder="Durak Adı"
          />
          <input
            type="text"
            onChange={(e) => handleStation(e.target.value, "lat", key)}
            placeholder="Enlem"
          />
          <input
            type="text"
            onChange={(e) => handleStation(e.target.value, "lon", key)}
            placeholder="Boylam"
          />
        </div>
      ))}
      <hr />
      <button disabled={!enabled}>Kaydet</button>
      <br />
      <pre>{JSON.stringify(route, null, 2)}</pre>
    </>
  );
}

export default App;
