import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TimeAgo from "timeago-react";

export default function ParkingSpaceDetail() {
  let { id } = useParams();
  const [viewport, setViewport] = useState({});
  const [parking, setParking] = useState({});
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [type, setType] = useState("");
  const [comment, setComment] = useState("");

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
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if (element.id == id) {
            setParking(element);
            setViewport({
              ...viewport,
              latitude: element.longitude,
              longitude: element.latitude,
              zoom: 15,
            });
            setLoading(false);
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    let data = qs.stringify({
      parking_space_id: id,
    });

    let config2 = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/reportsForParking",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config2)
      .then((response) => {
        setReports(response.data);
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading2(false);
      });
  }, []);

  const submitReport = (e) => {
    e.preventDefault();
    let data = qs.stringify({
      parking_space_id: id,
      user_id: 2,
      type: type,
      comments: comment,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://20.120.28.0:8000/api/reports",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
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
      {loading ? (
        "Loading..."
      ) : (
        <div className="p-2 m-3">
          <h3>{parking.street_name}</h3>
          <small style={{ fontSize: "12px", color: "#444444" }}>
            Posted <TimeAgo datetime={parking.date} locale="en_US" />
          </small>
          <div style={{ fontSize: "12px", color: "#444444" }}>🟢 Available</div>
          <a
            className="btn btn-success w-100 my-4"
            href={`http://www.google.com/maps/place/${parking.longitude},${parking.latitude}`}
          >
            Get Directions
          </a>
        </div>
      )}

      {loading2 ? (
        "Loading..."
      ) : (
        <div className="p-2 m-3">
          <h6>Reports</h6>
          {reports.length === 0 ? (
            <small>No reports found for this spot</small>
          ) : (
            <div>
              <ul>
                {reports.map((e) => (
                  <li>
                    <b>{e.type}</b>
                    <br />
                    <small>{e.comments}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <form className="row px-4 my-5" onSubmit={submitReport}>
        <div class="mb-3">
          <h6>Report this spot</h6>
          <label for="streetname" class="form-label">
            Type
          </label>
          <select
            class="form-select"
            onChange={(e) => setType(e.target.value)}
            value={type}
            aria-label="Default select example"
            required
          >
            <option selected>Already taken</option>
            <option>False Information</option>
            <option>Wrong Location</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="streetname" class="form-label">
            Comments
          </label>
          <input
            type="text"
            class="form-control"
            id="streetname"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
