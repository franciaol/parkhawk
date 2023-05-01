import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

export default function Home() {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/parkingSpaces",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setParkings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [viewport, setViewport] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 15,
      });
    });
  }, []);

  return (
    <div>
      <div className="p-0 m-0">
        <div
          style={{
            height: "70vh",
            width: "100vw",
            padding: 0,
            margin: 0,
            background: "#aaaaaa",
          }}
        >
          {viewport.latitude && viewport.longitude ? (
            <Map
              initialViewState={viewport}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken="pk.eyJ1IjoiZmhiMzY5IiwiYSI6ImNqcWY2anlhdjAzM3A0M21ibTU2bWx1ajcifQ.xSuQ4wgSW5j4L9ttItd9cw"
            >
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
              {parkings.map((e) => (
                <Marker
                  longitude={e.latitude}
                  latitude={e.longitude}
                  color="red"
                />
              ))}
            </Map>
          ) : (
            <p
              style={{
                position: "absolute",
                width: "100%",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Loading...
            </p>
          )}

          <Link
            to="/profile"
            style={{
              position: "fixed",
              height: "40px",
              width: "40px",
              background: "#eeeeee",
              borderRadius: "100%",
              top: 10,
              left: 10,
              border: "2px solid white",
              boxShadow: "0px 0px 10px #888888",
              overflow: "hidden",
            }}
          >
            <img
              src="https://i.pinimg.com/736x/71/dc/bc/71dcbcbb37583ee811221f67b09bf68b.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
          </Link>
        </div>
        <div className="row align-items-center justify-content-center p-0 m-0 mt-4">
          <div className="mb-2 text-center">
            <p style={{ fontSize: "22px" }}>Welcome to ParkHawk</p>
          </div>
          <Link
            to="/parkingSpaces"
            className="col-5 text-center"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <div
              style={{
                background: "#97c83e",
                textAlign: "center",
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <i class="bi bi-search"></i>
            </div>
            <br />
            <small className="text-black">Find Parking Spots</small>
          </Link>
          <Link
            to="/addParking"
            className="col-5 text-center"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <div
              style={{
                background: "#58bdfc",
                textAlign: "center",
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <i class="bi bi-plus-circle-dotted"></i>
            </div>
            <br />
            <small className="text-black">Add Parking Spot</small>
          </Link>
        </div>
      </div>
    </div>
  );
}
