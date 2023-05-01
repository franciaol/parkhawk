import React, { useEffect, useState } from "react";
import qs from "qs";
import axios from "axios";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { useNavigate } from "react-router-dom";

export default function AddParking() {
  const [viewport, setViewport] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 15,
      });
    });
  }, []);

  const [streetName, setStreetName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitParking = (e) => {
    setLoading(true);
    e.preventDefault();
    let data = qs.stringify({
      street_name: streetName,
      longitude: viewport.latitude,
      latitude: viewport.longitude,
      user_id: "1",
      availability: "true",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/parkingSpaces",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        window.history.back();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ height: "40vh", width: "100vw", padding: 0, margin: 0 }}>
        {viewport.latitude && viewport.longitude && (
          <Map
            initialViewState={viewport}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1IjoiZmhiMzY5IiwiYSI6ImNqcWY2anlhdjAzM3A0M21ibTU2bWx1ajcifQ.xSuQ4wgSW5j4L9ttItd9cw"
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
            />
          </Map>
        )}
      </div>
      <h3 className="p-2 m-3">Add a parking spot</h3>

      <form className="row px-4" onSubmit={submitParking}>
        <div class="mb-3">
          <label for="streetname" class="form-label">
            Street Name
          </label>
          <input
            type="text"
            class="form-control"
            id="streetname"
            required
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="streetname" class="form-label">
            Location Coordinates
          </label>
          {viewport.longitude}&nbsp;&nbsp;|&nbsp;&nbsp;{viewport.latitude}
        </div>

        <button type="submit" class="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
